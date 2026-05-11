import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardLayout from './layouts/DashboardLayout';
import Login from './pages/Login';

// Pages
import AdminDashboard from './pages/AdminDashboard';
import StaffDashboard from './pages/StaffDashboard';
import StudentDashboard from './pages/StudentDashboard';
import Students from './pages/Students';
import Blocks from './pages/Blocks';
import Allocations from './pages/Allocations';
import Profile from './pages/Profile';
import Reports from './pages/Reports';

// Remaining Placeholder components
const Rooms = () => <div className="p-8 text-2xl font-bold">Rooms Management - Coming Soon</div>;
const Maintenance = () => <div className="p-8 text-2xl font-bold">Maintenance Portal - Coming Soon</div>;
const Settings = () => <div className="p-8 text-2xl font-bold">System Settings - Coming Soon</div>;

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />

          {/* Root Redirect Logic */}
          <Route path="/" element={<HomeRedirect />} />

          {/* Protected Routes with Dashboard Layout */}
          <Route element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
            {/* Common Routes */}
            <Route path="/profile" element={<Profile />} />
            <Route path="/maintenance" element={<Maintenance />} />

            {/* Admin Specific */}
            <Route path="/admin/dashboard" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>} />
            <Route path="/admin/students" element={<ProtectedRoute allowedRoles={['admin', 'staff']}><Students /></ProtectedRoute>} />
            <Route path="/admin/blocks" element={<ProtectedRoute allowedRoles={['admin', 'staff']}><Blocks /></ProtectedRoute>} />
            <Route path="/admin/rooms" element={<ProtectedRoute allowedRoles={['admin', 'staff']}><Rooms /></ProtectedRoute>} />
            <Route path="/admin/allocations" element={<ProtectedRoute allowedRoles={['admin', 'staff']}><Allocations /></ProtectedRoute>} />
            <Route path="/admin/reports" element={<ProtectedRoute allowedRoles={['admin']}><Reports /></ProtectedRoute>} />
            <Route path="/settings" element={<ProtectedRoute allowedRoles={['admin']}><Settings /></ProtectedRoute>} />

            {/* Staff Specific */}
            <Route path="/staff/dashboard" element={<ProtectedRoute allowedRoles={['staff']}><StaffDashboard /></ProtectedRoute>} />

            {/* Student Specific */}
            <Route path="/student/dashboard" element={<ProtectedRoute allowedRoles={['student']}><StudentDashboard /></ProtectedRoute>} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

const HomeRedirect = () => {
  const userJson = localStorage.getItem('user');
  if (!userJson) return <Navigate to="/login" replace />;
  const user = JSON.parse(userJson);
  return <Navigate to={`/${user.role}/dashboard`} replace />;
};
