import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();

  const links = [
    { to: '/admin/submissions', label: '📥 View All Submissions' },
    { to: '/admin/upload-assignment', label: '📤 Upload Assignment' },
    { to: '/admin/upload-book', label: '📚 Upload Book' },
    { to: '/admin/notifications', label: '🔔 Send Notification' },
  ];

  return (
    <>
      <style>
        {`
          .sidebar {
            width: 250px;
            background-color: #1e1e2f;
            color: #fff;
            padding: 1.5rem;
            height: 100vh;
            position: fixed;
            top: 0;
            left: 0;
            overflow-y: auto;
          }

          .sidebar-title {
            font-size: 1.8rem;
            margin-bottom: 2rem;
            color: #00d8ff;
            font-weight: bold;
            text-align: center;
          }

          .nav-list {
            list-style: none;
            padding: 0;
            margin: 0;
          }

          .nav-link {
            display: block;
            padding: 0.75rem 1rem;
            color: #ccc;
            text-decoration: none;
            border-radius: 6px;
            transition: background 0.2s ease;
            margin-bottom: 0.5rem;
          }

          .nav-link:hover {
            background-color: #2e2e42;
            color: #fff;
          }

          .nav-link.active {
            background-color: #2e2e42;
            color: #fff;
            font-weight: bold;
          }
        `}
      </style>

      <div className="sidebar">
        <h2 className="sidebar-title">🛠️ Admin Panel</h2>
        <nav>
          <ul className="nav-list">
                            <Link to="/admin/view-notifications">My Notifications</Link>
                            <br/>
                            <Link to="/admin/AdminAttendance">View Attendance</Link>
            {links.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className={`nav-link ${
                    location.pathname === link.to ? 'active' : ''
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
