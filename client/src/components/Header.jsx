import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import authService from '../services/auth';

const Header = () => {
  const { isAuthenticated, user, setToken, setUser } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const handleLogout = () => {
    authService.logout();
    setToken(null);
    setUser(null);
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="w-full bg-turquoise/80 backdrop-blur-md shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Left: Logo */}
        <Link 
          to="/" 
          className="text-2xl md:text-3xl font-bold text-black hover:text-orange transition"
          onClick={closeMobileMenu}
        >
          StudyTrackr
        </Link>

        {/* Center: Public Links (desktop only, for non-authenticated users) */}
        {!isAuthenticated && (
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/home" 
              className={`group relative text-black/80 hover:text-black transition font-medium ${
                isActive('/home') ? 'text-black' : ''
              }`}
            >
              Home
              <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-orange transform origin-left transition-transform duration-300 ${
                isActive('/home') ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
              }`}></span>
            </Link>
            <Link 
              to="/features" 
              className={`group relative text-black/80 hover:text-black transition font-medium ${
                isActive('/features') ? 'text-black' : ''
              }`}
            >
              Features
              <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-orange transform origin-left transition-transform duration-300 ${
                isActive('/features') ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
              }`}></span>
            </Link>
            <Link 
              to="/pricing" 
              className={`group relative text-black/80 hover:text-black transition font-medium ${
                isActive('/pricing') ? 'text-black' : ''
              }`}
            >
              Pricing
              <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-orange transform origin-left transition-transform duration-300 ${
                isActive('/pricing') ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
              }`}></span>
            </Link>
            <Link 
              to="/contact" 
              className={`group relative text-black/80 hover:text-black transition font-medium ${
                isActive('/contact') ? 'text-black' : ''
              }`}
            >
              Contact
              <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-orange transform origin-left transition-transform duration-300 ${
                isActive('/contact') ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
              }`}></span>
            </Link>
          </div>
        )}

        {/* Right: Role-Based Actions (Desktop) */}
        <div className="hidden md:flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              <span className="text-black/80 font-medium">Welcome, {user?.name}</span>
              {user?.role === 'student' && (
                <Link 
                  to="/student/dashboard" 
                  className="text-black/80 hover:text-black transition font-medium"
                >
                  Dashboard
                </Link>
              )}
              {user?.role === 'teacher' && (
                <Link 
                  to="/teacher/dashboard" 
                  className="text-black/80 hover:text-black transition font-medium"
                >
                  Dashboard
                </Link>
              )}
              {user?.role === 'principal' && (
                <Link 
                  to="/principal/teachers" 
                  className="text-black/80 hover:text-black transition font-medium"
                >
                  Manage Teachers
                </Link>
              )}
              <button 
                onClick={handleLogout} 
                className="bg-black text-white px-4 py-2 rounded-xl hover:bg-gray-800 transition font-medium shadow-sm"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link 
                to="/login" 
                className="text-black/80 hover:text-black transition font-medium"
              >
                Login
              </Link>
              <Link 
                to="/register" 
                className="bg-orange text-white px-5 py-2 rounded-xl hover:bg-black transition font-medium shadow-sm drop-shadow-sm"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          onClick={toggleMobileMenu}
          className="md:hidden text-black hover:text-orange transition"
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isMobileMenuOpen ? (
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile dropdown menu */}
      <div
        className={`md:hidden bg-turquoise/95 backdrop-blur-md border-t border-black/10 overflow-hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-6 py-4 space-y-4">
          {!isAuthenticated && (
            <>
              <Link
                to="/home"
                className="block text-black/80 hover:text-black transition font-medium py-2"
                onClick={closeMobileMenu}
              >
                Home
              </Link>
              <Link
                to="/features"
                className="block text-black/80 hover:text-black transition font-medium py-2"
                onClick={closeMobileMenu}
              >
                Features
              </Link>
              <Link
                to="/pricing"
                className="block text-black/80 hover:text-black transition font-medium py-2"
                onClick={closeMobileMenu}
              >
                Pricing
              </Link>
              <Link
                to="/contact"
                className="block text-black/80 hover:text-black transition font-medium py-2"
                onClick={closeMobileMenu}
              >
                Contact
              </Link>
              <div className="pt-2 border-t border-black/10 space-y-2">
                <Link
                  to="/login"
                  className="block text-black/80 hover:text-black transition font-medium py-2"
                  onClick={closeMobileMenu}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block bg-orange text-white px-4 py-2 rounded-xl hover:bg-black transition font-medium text-center shadow-sm"
                  onClick={closeMobileMenu}
                >
                  Register
                </Link>
              </div>
            </>
          )}

          {isAuthenticated && (
            <>
              <div className="text-black/80 font-medium py-2">
                Welcome, {user?.name}
              </div>
              {user?.role === 'student' && (
                <Link
                  to="/student/dashboard"
                  className="block text-black/80 hover:text-black transition font-medium py-2"
                  onClick={closeMobileMenu}
                >
                  Dashboard
                </Link>
              )}
              {user?.role === 'teacher' && (
                <Link
                  to="/teacher/dashboard"
                  className="block text-black/80 hover:text-black transition font-medium py-2"
                  onClick={closeMobileMenu}
                >
                  Dashboard
                </Link>
              )}
              {user?.role === 'principal' && (
                <Link
                  to="/principal/teachers"
                  className="block text-black/80 hover:text-black transition font-medium py-2"
                  onClick={closeMobileMenu}
                >
                  Manage Teachers
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="w-full bg-black text-white px-4 py-2 rounded-xl hover:bg-gray-800 transition font-medium mt-2 shadow-sm"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;

