// src/pages/AdminNotifications.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminNotifications = () => {
  const [message, setMessage] = useState('');
  const [receiverId, setReceiverId] = useState('');
  const [notifications, setNotifications] = useState([]);
  const [msg, setMsg] = useState('');

  // Fetch previous notifications
  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/notifications', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotifications(res.data);
    } catch (err) {
      setMsg('Failed to load notifications');
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  // Send new notification
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message) return alert('Message cannot be empty');

    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'http://localhost:5000/api/notifications/send',
        {
            message,
            user_id: receiverId || null, // ✅ match backend expected field
            },
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );

      alert('Notification sent!');
      setMessage('');
      setReceiverId('');
      fetchNotifications();
    } catch (err) {
      alert('Failed to send notification');
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Admin - Send Notifications</h2>

      <form onSubmit={handleSubmit} className="mb-6 space-y-3">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter notification message"
          className="w-full border p-2 rounded"
          rows="3"
        />

        <input
          type="text"
          value={receiverId}
          onChange={(e) => setReceiverId(e.target.value)}
          placeholder="Student ID (leave blank to send to all)"
          className="w-full border p-2 rounded"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Send Notification
        </button>
      </form>

      <h3 className="text-xl font-semibold mb-2">Sent Notifications</h3>

      {msg && <p className="text-red-600">{msg}</p>}
      {notifications.length === 0 ? (
        <p>No notifications yet.</p>
      ) : (
        <ul className="space-y-3">
          {notifications.map((note) => (
            <li key={note.id} className="border p-3 rounded bg-white shadow-sm">
              <p>{note.message}</p>
              <p className="text-sm text-gray-500">
                {new Date(note.created_at).toLocaleString()}
              </p>
              <p className="text-sm text-gray-400">
                Receiver ID: {note.receiver_id || 'All Students'}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminNotifications;
