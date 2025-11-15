import api from './api';
import { setToken, removeToken } from './api';

export const authService = {
  // Signup
  signup: async (userData) => {
    const response = await api.post('/auth/signup', userData);
    return response.data;
  },

  // Login
  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    
    if (response.data.success && response.data.token) {
      setToken(response.data.token);
    }
    
    return response.data;
  },

  // Logout
  logout: () => {
    removeToken();
  },

  // Get current user (if needed)
  getCurrentUser: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },
};

export default authService;

