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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validate student has teacherId
    if (formData.role === 'student' && !formData.teacherId) {
      setError('Please select a teacher');
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
          navigate('/dashboard');
        } else {
          navigate('/login');
        }
      } else {
        setError(response.message || 'Registration failed');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            minLength={6}
          />
        </div>
        <div>
          <label htmlFor="role">Role:</label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
          >
            <option value="student">Student</option>
          </select>
        </div>
        {formData.role === 'student' && (
          <div>
            <label htmlFor="teacherId">Select Teacher:</label>
            {loadingTeachers ? (
              <p>Loading teachers...</p>
            ) : (
              <select
                id="teacherId"
                name="teacherId"
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
              <p style={{ color: 'orange' }}>
                No teachers available. Please contact administrator.
              </p>
            )}
          </div>
        )}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit" disabled={loading || loadingTeachers}>
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
      <p>
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
};

export default Register;

