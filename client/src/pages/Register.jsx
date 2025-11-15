import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import authService from '../services/auth';
import api from '../services/api';

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
  const [loadingTeachers, setLoadingTeachers] = useState(false);
  const navigate = useNavigate();
  const { setUser, setToken } = useAuth();

  // Fetch teachers when role is student (assignment requirement)
  useEffect(() => {
    if (formData.role === 'student') {
      fetchTeachers();
    } else {
      setTeachers([]);
      setFormData((prev) => ({ ...prev, teacherId: '' }));
    }
  }, [formData.role]);

  const fetchTeachers = async () => {
    try {
      setLoadingTeachers(true);
      // Fetch teachers from public endpoint
      const response = await api.get('/teachers');
      if (response.data.success) {
        setTeachers(response.data.data || []);
      } else {
        console.warn('Teachers endpoint returned unsuccessful response');
        setTeachers([]);
      }
    } catch (err) {
      console.error('Failed to load teachers:', err);
      console.error('Error details:', err.response?.data || err.message);
      // Show error but don't block registration - user can still proceed
      setTeachers([]);
    } finally {
      setLoadingTeachers(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
    // Clear teacherId when role changes
    if (name === 'role') {
      setFormData((prev) => ({ ...prev, teacherId: '' }));
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

    // TeacherId validation for students (assignment requirement)
    if (formData.role === 'student' && !formData.teacherId) {
      newErrors.teacherId = 'Please select a teacher (required for students)';
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
      // Build user data according to assignment requirements
      const userData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        // Only include teacherId if role is student (assignment requirement)
        ...(formData.role === 'student' && { teacherId: formData.teacherId }),
      };

      const response = await authService.signup(userData);

      if (response.success) {
        // After signup, automatically login (assignment requirement)
        const loginResponse = await authService.login(formData.email, formData.password);

        if (loginResponse.success) {
          setToken(loginResponse.token);
          setUser(loginResponse.user);
          
          // Redirect based on role (assignment requirement)
          if (loginResponse.user.role === 'student') {
            navigate('/student/dashboard');
          } else if (loginResponse.user.role === 'teacher') {
            navigate('/teacher/dashboard');
          } else if (loginResponse.user.role === 'principal') {
            navigate('/principal/teachers');
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
        <h2 className="text-2xl font-bold mb-6 text-black">Create Account</h2>
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
          
          {/* Role Selector - Assignment requirement: Must support student, teacher, and principal */}
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
              <option value="teacher">Teacher</option>
              <option value="principal">Principal</option>
            </select>
          </div>

          {/* TeacherId Dropdown - Only shown for students (assignment requirement) */}
          {formData.role === 'student' && (
            <div>
              <label htmlFor="teacherId" className="block text-sm font-medium text-gray-700 mb-1">
                Select Teacher <span className="text-red-500">*</span>
              </label>
              {loadingTeachers ? (
                <p className="text-gray-600 text-sm">Loading teachers...</p>
              ) : (
                <>
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
                  {teachers.length === 0 && !loadingTeachers && (
                    <div className="mt-2">
                      <p className="text-orange-500 text-sm">
                        No teachers available. Please contact administrator or ensure teachers are created first.
                      </p>
                      <p className="text-gray-500 text-xs mt-1">
                        If teachers exist, try refreshing the page or check the browser console for errors.
                      </p>
                    </div>
                  )}
                </>
              )}
              {errors.teacherId && <p className="text-red-500 text-sm mt-1">{errors.teacherId}</p>}
            </div>
          )}

          {/* Info message for teacher/principal roles */}
          {(formData.role === 'teacher' || formData.role === 'principal') && (
            <div className="bg-turquoise/10 border border-turquoise rounded-lg p-3">
              <p className="text-sm text-gray-700">
                {formData.role === 'teacher'
                  ? 'Teachers can self-register and will be able to manage tasks for assigned students.'
                  : 'Principals can manage teachers and oversee the campus.'}
              </p>
            </div>
          )}

          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button type="submit" className="btn-primary w-full" disabled={loading || (formData.role === 'student' && loadingTeachers)}>
            {loading ? 'Registering...' : 'Create Account'}
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
