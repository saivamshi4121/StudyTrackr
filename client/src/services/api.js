import axios from 'axios';

// Token persistence helpers
export const getToken = () => {
  return localStorage.getItem('token');
};

export const setToken = (token) => {
  localStorage.setItem('token', token);
};

export const removeToken = () => {
  localStorage.removeItem('token');
};

// Base API configuration
const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    
    if (status === 401) {
      // Token expired or invalid - auto logout
      removeToken();
      
      // Dispatch custom event for toast notification
      window.dispatchEvent(new CustomEvent('auth-error', { 
        detail: { message: 'Your session has expired. Please login again.' } 
      }));
      
      // Redirect to login after a short delay to allow toast to show
      setTimeout(() => {
        window.location.href = '/login';
      }, 1000);
    } else if (status === 403) {
      // Forbidden - show error message
      window.dispatchEvent(new CustomEvent('auth-error', { 
        detail: { message: 'You do not have permission to perform this action.' } 
      }));
    }
    
    return Promise.reject(error);
  }
);

export default api;

