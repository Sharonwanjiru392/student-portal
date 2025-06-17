import React from 'react';

const Topbar = () => {
  return (
    <div style={styles.topbar}>
      <h3 style={styles.title}>Admin Dashboard</h3>
    </div>
  );
};

const styles = {
  topbar: {
    backgroundColor: '#fff',
    padding: '1rem 2rem',
    borderBottom: '1px solid #ddd',
  },
  title: {
    margin: 0,
  },
};

export default Topbar;
