/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const StudentDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <>
      <style>
        {`
          body {
            margin: 0;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f0f2f5;
          }

          .dashboard-wrapper {
            display: flex;
            min-height: 100vh;
          }

          .sidebar {
            width: 220px;
            background-color: #1e1e2f;
            color: #fff;
            padding: 2rem 1rem;
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
            box-shadow: 2px 0 5px rgba(0,0,0,0.1);
          }

          .sidebar h2 {
            font-size: 1.5rem;
            color: #00d8ff;
            text-align: center;
          }

          .sidebar a {
            color: #ccc;
            text-decoration: none;
            padding: 0.6rem 1rem;
            border-radius: 6px;
            transition: 0.3s ease;
          }

          .sidebar a:hover {
            background-color: #2e2e42;
            color: white;
          }

          .main {
            flex: 1;
            padding: 3rem;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .dashboard-card {
            background: #ffffff;
            padding: 40px;
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            max-width: 450px;
            width: 100%;
            text-align: center;
          }

          .dashboard-title {
            font-size: 30px;
            font-weight: bold;
            margin-bottom: 30px;
            color: #333;
          }

          .dashboard-links {
            display: flex;
            flex-direction: column;
            gap: 15px;
            margin-top: 20px;
          }

          .dashboard-btn {
            padding: 12px;
            border: none;
            border-radius: 8px;
            text-align: center;
            text-decoration: none;
            color: white;
            font-weight: 500;
            cursor: pointer;
            transition: background 0.3s ease;
          }

          .dashboard-btn.blue {
            background-color: #007bff;
          }

          .dashboard-btn.blue:hover {
            background-color: #0056b3;
          }

          .dashboard-btn.green {
            background-color: #28a745;
          }

          .dashboard-btn.green:hover {
            background-color: #1e7e34;
          }

          .dashboard-btn.red {
            background-color: #dc3545;
          }

          .dashboard-btn.red:hover {
            background-color: #a71d2a;
          }

          .link-plain {
            color: #007bff;
            text-decoration: underline;
            font-size: 0.95rem;
            margin-top: 10px;
          }

        `}
      </style>

      <div className="dashboard-wrapper">
        {/* Sidebar */}
        <div className="sidebar">
          <h2>📘 Student</h2>
          <Link to="/student/assignments">📄 Assignments</Link>
          <Link to="/student/submit-assignment">📤 Submit</Link>
          <Link to="/student/my-submissions">📁 My Submissions</Link>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a onClick={handleLogout} style={{ cursor: 'pointer', color: '#dc3545' }}>
            🔓 Logout
          </a>
        </div>

        {/* Main Content */}
        <div className="main">
          <div className="dashboard-card">
            <h1 className="dashboard-title">Welcome to Your Dashboard</h1>
            <p style={{ color: '#555' }}>
              Access assignments, upload your work, and track your progress.
            </p>

            <div className="dashboard-links">
              <Link to="/student/assignments" className="dashboard-btn blue">
                View Available Assignments
              </Link>

              <Link to="/student/submit-assignment" className="dashboard-btn green">
                Submit Assignment
              </Link>

              <Link to="/student/my-submissions" className="link-plain">
                View My Submissions
              </Link>
              <Link to="/student/notifications">Notifications</Link>

              <button onClick={handleLogout} className="dashboard-btn red">
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentDashboard;
