import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StudentNotifications = () => {
  const [notifications, setNotifications] = useState([]);

  const fetchNotifications = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/notifications', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotifications(res.data);
    } catch (err) {
      console.error('Error fetching notifications', err);
    }
  };

  const markAsRead = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `http://localhost:5000/api/notifications/read/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchNotifications(); // Refresh the list
    } catch (err) {
      console.error('Failed to mark notification as read', err);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">My Notifications</h2>
      {notifications.length === 0 ? (
        <p>No notifications found.</p>
      ) : (
        <ul className="space-y-3">
          {notifications.map((note) => (
            <li
              key={note.id}
              className={`border p-3 rounded shadow-sm ${
                note.read ? 'bg-gray-100' : 'bg-yellow-100'
              }`}
            >
              <p>{note.message}</p>
              <p className="text-sm text-gray-500">
                {new Date(note.created_at).toLocaleString()}
              </p>
              {!note.read && (
                <button
                  onClick={() => markAsRead(note.id)}
                  className="mt-2 px-3 py-1 bg-green-600 text-white rounded"
                >
                  Mark as Read
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default StudentNotifications;
