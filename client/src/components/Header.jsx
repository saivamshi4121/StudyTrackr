import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import authService from '../services/auth';

const Header = () => {
  const { isAuthenticated, user, setToken, setUser } = useAuth();

  const handleLogout = () => {
    authService.logout();
    setToken(null);
    setUser(null);
  };

  return (
    <nav className="w-full bg-turquoise shadow-md py-4">
      <div className="w-full flex flex-col md:flex-row justify-between items-center gap-4 px-4 md:px-8">
        <Link to="/" className="text-xl md:text-2xl font-bold text-black hover:text-orange transition">
          StudyTrackr
        </Link>
        <div className="space-x-2 md:space-x-4 flex items-center flex-wrap justify-center">
        {isAuthenticated ? (
          <>
            <span className="text-black">Welcome, {user?.name}</span>
            {user?.role === 'student' && (
              <Link to="/student/dashboard" className="text-black hover:text-orange transition">
                Dashboard
              </Link>
            )}
            {user?.role === 'teacher' && (
              <Link to="/teacher/dashboard" className="text-black hover:text-orange transition">
                Dashboard
              </Link>
            )}
            {user?.role === 'principal' && (
              <Link to="/principal/teachers" className="text-black hover:text-orange transition">
                Teachers
              </Link>
            )}
            <button onClick={handleLogout} className="btn-primary">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-black hover:text-orange transition">
              Login
            </Link>
            <Link to="/register" className="btn-primary">
              Register
            </Link>
          </>
        )}
        </div>
      </div>
    </nav>
  );
};

export default Header;

