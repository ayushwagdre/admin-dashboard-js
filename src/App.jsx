import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardLayout from './components/DashboardLayout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Blogs from './pages/Blogs';
import Portfolios from './pages/Portfolios';
import Testimonials from './pages/Testimonials';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route
              path="users"
              element={
                <ProtectedRoute requiredPermission="view_users">
                  <Users />
                </ProtectedRoute>
              }
            />
            <Route
              path="blogs"
              element={
                <ProtectedRoute requiredPermission="read_blog">
                  <Blogs />
                </ProtectedRoute>
              }
            />
            <Route
              path="portfolios"
              element={
                <ProtectedRoute requiredPermission="read_portfolio">
                  <Portfolios />
                </ProtectedRoute>
              }
            />
            <Route
              path="testimonials"
              element={
                <ProtectedRoute requiredPermission="read_testimonial">
                  <Testimonials />
                </ProtectedRoute>
              }
            />
          </Route>

          {/* Redirect root to dashboard */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />

          {/* 404 Not Found */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
