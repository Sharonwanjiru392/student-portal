import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminViewNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [msg, setMsg] = useState('');

  useEffect(() => {
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

    fetchNotifications();
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">My Notifications</h2>
      {msg && <p className="text-red-600">{msg}</p>}

      {notifications.length === 0 ? (
        <p>No notifications yet.</p>
      ) : (
        <ul className="space-y-4">
          {notifications.map((note) => (
            <li key={note.id} className="border p-3 rounded bg-white shadow">
              <p className="font-medium">{note.message}</p>
              <p className="text-sm text-gray-500">{new Date(note.created_at).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminViewNotifications;
