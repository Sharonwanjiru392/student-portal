/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const UploadAssignment = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    due_date: '',
    file: null,
  });
  const [msg, setMsg] = useState('');

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'file') {
      setFormData({ ...formData, file: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('due_date', formData.due_date);
    data.append('file', formData.file);

    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/assignments/upload', data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      setMsg('✅ Assignment uploaded successfully!');
      setFormData({ title: '', description: '', due_date: '', file: null });

      // Optional: auto-redirect after a short delay
      // setTimeout(() => navigate('/admin/dashboard'), 2000);
    } catch (err) {
      setMsg(err.response?.data?.msg || '❌ Failed to upload assignment');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2>Upload Assignment</h2>
        <Link to="/admin/dashboard" style={styles.backButton}>← Back to Dashboard</Link>
      </div>

      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.label}>Title:</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <label style={styles.label}>Description:</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          style={styles.textarea}
        />

        <label style={styles.label}>Due Date:</label>
        <input
          type="date"
          name="due_date"
          value={formData.due_date}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <label style={styles.label}>File:</label>
        <input
          type="file"
          name="file"
          onChange={handleChange}
          required
          style={styles.input}
        />

        <button type="submit" style={styles.button}>Upload</button>
        {msg && <p style={styles.message}>{msg}</p>}
      </form>
    </div>
  );
};

const styles = {
  container: {
    padding: '2rem',
    maxWidth: '600px',
    margin: '0 auto',
    fontFamily: 'Arial, sans-serif',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1.5rem',
  },
  backButton: {
    textDecoration: 'none',
    color: '#007bff',
    fontSize: '0.9rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
  },
  label: {
    marginBottom: '0.5rem',
    fontWeight: 'bold',
  },
  input: {
    marginBottom: '1.2rem',
    padding: '0.7rem',
    fontSize: '1rem',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  textarea: {
    marginBottom: '1.2rem',
    padding: '0.7rem',
    fontSize: '1rem',
    borderRadius: '5px',
    border: '1px solid #ccc',
    resize: 'vertical',
  },
  button: {
    padding: '0.75rem',
    backgroundColor: '#007bff',
    color: '#fff',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  message: {
    marginTop: '1rem',
    color: '#28a745',
  },
};

export default UploadAssignment;
