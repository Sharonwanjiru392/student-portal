import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SubmitAssignment = () => {
  const [assignments, setAssignments] = useState([]);
  const [selected, setSelected] = useState('');
  const [file, setFile] = useState(null);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('http://localhost:5000/api/assignments', {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(res => setAssignments(res.data))
    .catch(err => console.error(err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selected || !file) return setMsg('Please select assignment and file');

    const formData = new FormData();
    formData.append('assignment_id', selected);
    formData.append('file', file);

    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/submissions/submit', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      setMsg('Assignment submitted successfully');
    } catch (err) {
      setMsg(err.response?.data?.msg || 'Submission failed');
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Submit Assignment</h2>
      <form onSubmit={handleSubmit}>
        <select
          className="w-full p-2 border mb-3"
          onChange={(e) => setSelected(e.target.value)}
          value={selected}
        >
          <option value="">-- Select Assignment --</option>
          {assignments.map((a) => (
            <option key={a.id} value={a.id}>{a.title}</option>
          ))}
        </select>

        <input
          type="file"
          className="w-full p-2 border mb-3"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
          Submit
        </button>

        {msg && <p className="mt-3 text-center text-red-600">{msg}</p>}
      </form>
    </div>
  );
};

export default SubmitAssignment;
