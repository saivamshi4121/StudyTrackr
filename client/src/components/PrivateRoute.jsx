import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  // TODO: Add authentication check
  const isAuthenticated = false; // Placeholder

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;

