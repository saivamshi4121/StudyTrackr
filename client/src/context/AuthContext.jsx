import { createContext, useContext, useState, useEffect } from 'react';
import { getToken, setToken as setTokenStorage, removeToken } from '../services/api';

const AuthContext = createContext();

// Helper to decode JWT token (simple base64 decode, no verification)
const decodeToken = (token) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    return null;
  }
};

// Helper to get user from localStorage
const getUserFromStorage = () => {
  try {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  } catch (error) {
    return null;
  }
};

// Helper to save user to localStorage
const saveUserToStorage = (user) => {
  if (user) {
    localStorage.setItem('user', JSON.stringify(user));
  } else {
    localStorage.removeItem('user');
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => getUserFromStorage());
  const [token, setTokenState] = useState(getToken());
  const [isInitializing, setIsInitializing] = useState(true);

  // Custom setUser that also persists to localStorage
  const setUserAndPersist = (userData) => {
    setUser(userData);
    saveUserToStorage(userData);
  };

  // Sync token with localStorage
  const setToken = (newToken) => {
    if (newToken) {
      setTokenStorage(newToken);
      setTokenState(newToken);
    } else {
      removeToken();
      setTokenState(null);
      setUserAndPersist(null);
    }
  };

  // Initialize user from token on mount
  useEffect(() => {
    const storedToken = getToken();
    if (storedToken) {
      setTokenState(storedToken);
      
      // Try to get user from localStorage first
      const storedUser = getUserFromStorage();
      if (storedUser) {
        setUser(storedUser);
        setIsInitializing(false);
      } else {
        // If no stored user, decode token to get at least role and id
        const decoded = decodeToken(storedToken);
        if (decoded && decoded.id && decoded.role) {
          setUserAndPersist({
            id: decoded.id,
            role: decoded.role,
            // Other fields will be fetched when needed
          });
        }
        setIsInitializing(false);
      }
    } else {
      setIsInitializing(false);
    }
  }, []);

  const value = {
    user,
    token,
    setUser: setUserAndPersist,
    setToken,
    isAuthenticated: !!token,
    isInitializing,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

