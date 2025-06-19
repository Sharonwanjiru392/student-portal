import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Auth pages
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';

// Admin pages
import AdminDashboard from './pages/Admin/AdminDashboard';
import UploadAssignment from './pages/Admin/UploadAssignment';
import AllSubmissions from './pages/Admin/AllSubmissions'; // Adjust the path if different
import AdminNotifications from './pages/Admin/AdminNotifications';
import AdminViewNotifications from './pages/Admin/AdminViewNotifications';
import AdminAttendance from './pages/Admin/AdminAttendance';


// Student pages
import StudentDashboard from './pages/Student/StudentDashboard';
import StudentAssignments from './pages/Student/StudentAssignments';
import SubmitAssignment from './pages/Student/SubmitAssignment';
import MySubmissions from './pages/Student/MySubmissions'; // 👈 Add this at the top
import Notifications from './pages/Student/Notifications';


// Shared component
import AssignmentsList from './pages/Shared/AssignmentsList';

const App = () => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const role = user.role;

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Admin Routes */}
        <Route
          path="/admin/dashboard"
          element={token && role === 'admin' ? <AdminDashboard /> : <Navigate to="/" />}
        />
        <Route
          path="/admin/upload-assignment"
          element={token && role === 'admin' ? <UploadAssignment /> : <Navigate to="/" />}
        />

        {/* Student Routes */}
        <Route
          path="/student/dashboard"
          element={token && role === 'student' ? <StudentDashboard /> : <Navigate to="/" />}
        />
        <Route
          path="/student/assignments"
          element={token && role === 'student' ? <StudentAssignments /> : <Navigate to="/" />}
        />
        <Route
          path="/student/submit-assignment"
          element={token && role === 'student' ? <SubmitAssignment /> : <Navigate to="/" />}
        />

        {/* Shared Route - all roles */}
        <Route
          path="/assignments"
          element={token ? <AssignmentsList /> : <Navigate to="/" />}
        />
        <Route
        path="/student/my-submissions"
        element={
          token && role === 'student' ? <MySubmissions /> : <Navigate to="/" />
          }
          />
           <Route path="/admin/submissions" element={<AllSubmissions />} />
           <Route path="/student/notifications" element={<Notifications/>} />
           <Route path="/admin/notifications" element={<AdminNotifications />} />
            <Route path="/admin/view-notifications" element={<AdminViewNotifications />} />
            <Route path="/admin/AdminAttendance" element={<AdminAttendance />} />
      </Routes>
    </Router>
  );
};

export default App;
