import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from './LoadingSpinner';

const PrivateRouteRole = ({ children, allowedRoles = [] }) => {
  const { isAuthenticated, user, token, isInitializing } = useAuth();

  // Wait for initialization to complete
  if (isInitializing) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated || !token) {
    return <Navigate to="/login" replace />;
  }

  // If user object is not loaded yet, wait
  if (!user || !user.role) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  // Check if user's role is allowed
  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    // Redirect to appropriate dashboard based on role
    if (user.role === 'student') {
      return <Navigate to="/student/dashboard" replace />;
    } else if (user.role === 'teacher') {
      return <Navigate to="/teacher/dashboard" replace />;
    } else if (user.role === 'principal') {
      return <Navigate to="/principal/teachers" replace />;
    }
    // Fallback to generic dashboard
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default PrivateRouteRole;

