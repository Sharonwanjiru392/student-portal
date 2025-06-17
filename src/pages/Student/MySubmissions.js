// pages/Student/MySubmissions.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MySubmissions = () => {
  const [submissions, setSubmissions] = useState([]);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/submissions/my-submissions', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSubmissions(res.data);
      } catch (err) {
        setMsg('Failed to fetch submissions');
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4">My Submissions</h2>
      {msg && <p className="text-red-600">{msg}</p>}
      {submissions.length === 0 ? (
        <p>No submissions found.</p>
      ) : (
        <ul className="space-y-4">
          {submissions.map((s) => (
            <li key={s.id} className="p-4 bg-white rounded shadow">
              <p><strong>Assignment:</strong> {s.assignment_title}</p>
              <p><strong>Submitted At:</strong> {new Date(s.submitted_at).toLocaleString()}</p>
              <p><strong>Status:</strong> {s.status}</p>
              <a
                href={s.file_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                View Submitted File
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MySubmissions;
