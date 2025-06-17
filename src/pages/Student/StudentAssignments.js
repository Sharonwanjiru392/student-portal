import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StudentAssignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/assignments', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAssignments(res.data);
      } catch (err) {
        console.error('Error fetching assignments:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAssignments();
  }, [token]);

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Available Assignments</h2>

      {loading ? (
        <p>Loading assignments...</p>
      ) : assignments.length === 0 ? (
        <p>No assignments available.</p>
      ) : (
        <ul style={styles.list}>
          {assignments.map((a) => (
            <li key={a.id} style={styles.item}>
              <h3>{a.title}</h3>
              <p>{a.description}</p>
              <p><strong>Due:</strong> {new Date(a.due_date).toLocaleDateString()}</p>
              <a
                href={a.file_url}
                target="_blank"
                rel="noopener noreferrer"
                style={styles.download}
              >
                📄 Download
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '2rem',
    maxWidth: '800px',
    margin: 'auto',
  },
  title: {
    textAlign: 'center',
    marginBottom: '1rem',
  },
  list: {
    listStyle: 'none',
    padding: 0,
  },
  item: {
    padding: '1rem',
    marginBottom: '1rem',
    border: '1px solid #ddd',
    borderRadius: '8px',
    backgroundColor: '#fafafa',
  },
  download: {
    display: 'inline-block',
    marginTop: '0.5rem',
    padding: '0.5rem 1rem',
    backgroundColor: '#007bff',
    color: '#fff',
    textDecoration: 'none',
    borderRadius: '5px',
  },
};

export default StudentAssignments;
