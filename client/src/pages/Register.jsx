import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import authService from '../services/auth';
import teacherService from '../services/teacher';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'student',
    teacherId: '',
  });
  const [teachers, setTeachers] = useState([]);
  const [error, setError] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [loadingTeachers, setLoadingTeachers] = useState(true);
  const navigate = useNavigate();
  const { setUser, setToken } = useAuth();

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await teacherService.getTeachers();
        if (response.success) {
          setTeachers(response.data || []);
        }
      } catch (err) {
        console.error('Failed to load teachers:', err);
      } finally {
        setLoadingTeachers(false);
      }
    };

    fetchTeachers();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear error for this field when user starts typing
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    // TeacherId validation for students
    if (formData.role === 'student' && !formData.teacherId) {
      newErrors.teacherId = 'Please select a teacher';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setErrors({});

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const userData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        ...(formData.role === 'student' && { teacherId: formData.teacherId }),
      };

      const response = await authService.signup(userData);

      if (response.success) {
        // After signup, automatically login
        const loginResponse = await authService.login(formData.email, formData.password);
        
        if (loginResponse.success) {
          setToken(loginResponse.token);
          setUser(loginResponse.user);
          // Redirect based on role
          if (loginResponse.user.role === 'student') {
            navigate('/student/dashboard');
          } else {
            navigate('/dashboard');
          }
        } else {
          navigate('/login');
        }
      } else {
        const errorMsg = response.message || 'Registration failed. Please check your information and try again.';
        setError(errorMsg);
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.response?.data?.errors?.[0]?.msg;
      if (errorMessage) {
        setError(errorMessage);
      } else if (err.response?.data?.errors) {
        // Handle validation errors from backend
        const backendErrors = err.response.data.errors;
        const firstError = backendErrors[0];
        setError(firstError.msg || 'Please check your information and try again.');
      } else {
        setError('Unable to connect to server. Please check your internet connection and try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-start pt-8 sm:pt-20 bg-white px-4 py-8">
      <div className="w-full max-w-lg bg-white shadow-xl p-4 sm:p-8 rounded-xl border-2 border-turquoise">
        <h2 className="text-2xl font-bold mb-6 text-black">Register</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="input"
              value={formData.name}
              onChange={handleChange}
              required
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="input"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="input"
              value={formData.password}
              onChange={handleChange}
              required
              minLength={6}
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
              Role
            </label>
            <select
              id="role"
              name="role"
              className="input"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="student">Student</option>
            </select>
          </div>
          {formData.role === 'student' && (
            <div>
              <label htmlFor="teacherId" className="block text-sm font-medium text-gray-700 mb-1">
                Select Teacher
              </label>
              {loadingTeachers ? (
                <p className="text-gray-600">Loading teachers...</p>
              ) : (
                <select
                  id="teacherId"
                  name="teacherId"
                  className="input"
                  value={formData.teacherId}
                  onChange={handleChange}
                  required
                >
                  <option value="">-- Select a teacher --</option>
                  {teachers.map((teacher) => (
                    <option key={teacher._id} value={teacher._id}>
                      {teacher.name} ({teacher.email})
                    </option>
                  ))}
                </select>
              )}
              {teachers.length === 0 && !loadingTeachers && (
                <p className="text-orange-500 text-sm mt-1">
                  No teachers available. Please contact administrator.
                </p>
              )}
              {errors.teacherId && <p className="text-red-500 text-sm mt-1">{errors.teacherId}</p>}
            </div>
          )}
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button type="submit" className="btn-primary w-full" disabled={loading || loadingTeachers}>
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600">
          Already have an account? <Link to="/login" className="text-orange hover:text-black transition">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;

