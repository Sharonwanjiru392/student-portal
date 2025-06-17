import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AssignmentsList = () => {
  const [assignments, setAssignments] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/assignments', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAssignments(res.data);
      } catch (err) {
        setError('⚠️ Failed to load assignments. Please try again.');
      }
    };

    fetchAssignments();
  }, []);

  return (
    <div style={styles.wrapper}>
      <div style={styles.header}>
        <h1 style={styles.title}>📚 Assignments</h1>
        <p style={styles.subtitle}>Below are all assignments available for download.</p>
      </div>

      {error && <p style={styles.error}>{error}</p>}

      <div style={styles.cardsContainer}>
        {assignments.length > 0 ? (
          assignments.map((assignment) => (
            <div key={assignment.id} style={styles.card}>
              <h3 style={styles.cardTitle}>{assignment.title}</h3>
              <p style={styles.description}>
                <strong>Description:</strong>{' '}
                {assignment.description || 'No description provided.'}
              </p>
              <p style={styles.dueDate}>
                <strong>Due:</strong>{' '}
                {new Date(assignment.due_date).toLocaleDateString()}
              </p>
              <a
                href={assignment.file_url}
                target="_blank"
                rel="noopener noreferrer"
                style={styles.downloadBtn}
              >
                📎 Download Assignment
              </a>
            </div>
          ))
        ) : (
          <p style={{ textAlign: 'center' }}>No assignments available.</p>
        )}
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    padding: '2rem',
    backgroundColor: '#f2f5f9',
    minHeight: '100vh',
    fontFamily: 'Arial, sans-serif',
  },
  header: {
    textAlign: 'center',
    marginBottom: '2rem',
  },
  title: {
    fontSize: '2rem',
    color: '#333',
  },
  subtitle: {
    fontSize: '1rem',
    color: '#555',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginBottom: '1.5rem',
  },
  cardsContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '1.5rem',
  },
  card: {
    backgroundColor: '#fff',
    padding: '1.5rem',
    borderRadius: '10px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    transition: 'transform 0.2s',
  },
  cardTitle: {
    margin: '0 0 0.5rem',
    fontSize: '1.2rem',
    color: '#1d3557',
  },
  description: {
    fontSize: '0.95rem',
    color: '#333',
    marginBottom: '0.5rem',
  },
  dueDate: {
    fontSize: '0.9rem',
    color: '#6c757d',
    marginBottom: '1rem',
  },
  downloadBtn: {
    padding: '0.6rem',
    backgroundColor: '#007bff',
    color: '#fff',
    textAlign: 'center',
    borderRadius: '5px',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
};

export default AssignmentsList;
