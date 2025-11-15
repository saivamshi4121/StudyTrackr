import { createContext, useContext, useState, useEffect } from 'react';
import { getToken, setToken as setTokenStorage, removeToken } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setTokenState] = useState(getToken());

  // Sync token with localStorage
  const setToken = (newToken) => {
    if (newToken) {
      setTokenStorage(newToken);
      setTokenState(newToken);
    } else {
      removeToken();
      setTokenState(null);
      setUser(null);
    }
  };

  // Initialize user from token on mount
  useEffect(() => {
    const storedToken = getToken();
    if (storedToken) {
      setTokenState(storedToken);
      // TODO: Fetch user data from token if needed
    }
  }, []);

  const value = {
    user,
    token,
    setUser,
    setToken,
    isAuthenticated: !!token,
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

