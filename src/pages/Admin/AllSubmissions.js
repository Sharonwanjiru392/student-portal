import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AllSubmissions = () => {
  const [submissions, setSubmissions] = useState([]);
  const [grades, setGrades] = useState({});
  const [msg, setMsg] = useState('');

  // ───────── Fetch submissions ─────────
  const fetchSubmissions = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/submissions', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSubmissions(res.data);
      setMsg('');
    } catch (err) {
      setMsg('Failed to load submissions');
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  // ───────── Local grade input handling ─────────
  const handleGradeChange = (id, value) => {
    setGrades(prev => ({ ...prev, [id]: value }));
  };

  // ───────── Send grade to backend ─────────
  const submitGrade = async (id) => {
    const grade = grades[id];
    if (!grade) return alert('Enter a grade first');

    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `http://localhost:5000/api/submissions/grade/${id}`,
        { grade },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Grade submitted!');
      fetchSubmissions(); // refresh list
      setGrades(prev => ({ ...prev, [id]: '' })); // clear input
    } catch (err) {
      alert('Failed to submit grade');
    }
  };

  // ───────── UI ─────────
  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">All Student Submissions</h2>

      {msg && <p className="text-red-600">{msg}</p>}

      {submissions.length === 0 ? (
        <p>No submissions yet.</p>
      ) : (
        <table className="w-full border text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2">Student</th>
              <th className="p-2">Assignment</th>
              <th className="p-2">Submitted At</th>
              <th className="p-2">Status</th>
              <th className="p-2">File</th>
              <th className="p-2 w-40">Grade / Action</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((s) => (
              <tr key={s.id} className="border-b text-center">
                <td className="p-2">{s.student_name}</td>
                <td className="p-2">{s.assignment_title}</td>
                <td className="p-2">{new Date(s.submitted_at).toLocaleString()}</td>
                <td className="p-2">{s.status}</td>
                <td className="p-2">
                  <a
                    href={s.file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    View File
                  </a>
                </td>
                <td className="p-2">
                  {s.grade ? (
                    <span className="font-semibold">{s.grade}</span>
                  ) : (
                    <>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        placeholder="Grade"
                        value={grades[s.id] ?? ''}
                        onChange={(e) => handleGradeChange(s.id, e.target.value)}
                        className="border p-1 w-20 mr-2"
                      />
                      <button
                        onClick={() => submitGrade(s.id)}
                        className="bg-green-500 text-white px-2 py-1 rounded"
                      >
                        Save
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AllSubmissions;
