import React from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

const AdminDashboard = () => {
  return (
    <div style={styles.dashboard}>
      <Sidebar />
      <div style={styles.main}>
        <Topbar />
        <div style={styles.content}>
          <h2>Welcome Admin 👋</h2>
          <p>Select an action from the sidebar to begin.</p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  dashboard: {
    display: 'flex',
    height: '100vh',
  },
  main: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    padding: '2rem',
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
};

export default AdminDashboard;
