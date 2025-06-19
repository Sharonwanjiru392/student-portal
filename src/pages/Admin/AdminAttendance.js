import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API = 'http://localhost:5000/api';

export default function AdminAttendance() {
  const [students,   setStudents]   = useState([]);
  const [date,       setDate]       = useState('');
  const [attendance, setAttendance] = useState({});
  const [absentees,  setAbsentees]  = useState([]);
  const [msg,        setMsg]        = useState('');

  const token = localStorage.getItem('token');

  // Fetch students once
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`${API}/users/students`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStudents(data);
      } catch (err) {
        setMsg('Failed to fetch students');
        console.error(err);
      }
    })();
  }, [token]);

  /** update local state when select changes */
  const handleSelect = (studentId, status) =>
    setAttendance(prev => ({ ...prev, [studentId]: status }));

  /** POST bulk attendance */
  const submitAttendance = async () => {
    if (!date) return setMsg('Please pick a date');

    try {
      const payload = {
        date,
        attendance: Object.entries(attendance).map(([studentId, status]) => ({
            student_id: studentId, // ✅ CORRECT key name
            status,
        })),
    };


      await axios.post(`${API}/attendance/mark`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setMsg('✅ Attendance marked');
      setAttendance({});
    } catch (err) {
      setMsg('❌ Error submitting attendance');
      console.error(err);
    }
  };

  /** GET absentees for selected date */
  const loadAbsentees = async () => {
    if (!date) return setMsg('Pick a date first');

    try {
      const { data } = await axios.get(
        `${API}/attendance/absentees/${date}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setAbsentees(data);
    } catch (err) {
      setMsg('❌ Failed to fetch absentees');
      console.error(err);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">📅 Admin Attendance</h1>

      {msg && <p className="text-red-600">{msg}</p>}

      {/* Date picker */}
      <input
        type="date"
        className="border p-2 rounded"
        value={date}
        onChange={e => setDate(e.target.value)}
      />

      {/* Student list */}
      <ul className="space-y-2">
        {students.map(s => (
          <li key={s.id} className="flex items-center gap-4 border p-2 rounded">
            <span className="flex-1">{s.name}</span>
            <select
              value={attendance[s.id] || ''}
              onChange={e => handleSelect(s.id, e.target.value)}
              className="border p-1 rounded"
            >
              <option value="">--</option>
              <option value="present">Present</option>
              <option value="absent">Absent</option>
            </select>
          </li>
        ))}
      </ul>

      {/* Submit button */}
      <button
        onClick={submitAttendance}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
      >
        ✅ Submit Attendance
      </button>

      <hr />

      {/* Absentees */}
      <h2 className="text-2xl font-semibold">❌ Absent Students</h2>
      <button
        onClick={loadAbsentees}
        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
      >
        View Absentees
      </button>

      {absentees.length > 0 && (
        <ul className="mt-4 space-y-2">
          {absentees.map(a => (
            <li key={a.id} className="border p-2 rounded">
              {a.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
