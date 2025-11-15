import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import principalService from '../services/principal';

const PrincipalManageTeachers = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [teachers, setTeachers] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingTeachers, setLoadingTeachers] = useState(true);

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      setLoadingTeachers(true);
      const response = await principalService.getTeachers();
      if (response.success) {
        setTeachers(response.data || []);
      }
    } catch (err) {
      console.error('Failed to fetch teachers:', err);
    } finally {
      setLoadingTeachers(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const response = await principalService.createTeacher(formData);

      if (response.success) {
        setSuccess('Teacher created successfully!');
        setFormData({ name: '', email: '', password: '' });
        // Refresh teachers list
        fetchTeachers();
      } else {
        setError(response.message || 'Failed to create teacher');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create teacher. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Manage Teachers</h2>
      {user && <p>Welcome, {user.name} (Principal)</p>}

      <div>
        <h3>Create New Teacher</h3>
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
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {success && <p style={{ color: 'green' }}>{success}</p>}
          <button type="submit" disabled={loading}>
            {loading ? 'Creating...' : 'Create Teacher'}
          </button>
        </form>
      </div>

      <div>
        <h3>All Teachers</h3>
        {loadingTeachers ? (
          <p>Loading teachers...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Created At</th>
              </tr>
            </thead>
            <tbody>
              {teachers.length === 0 ? (
                <tr>
                  <td colSpan="3">No teachers found</td>
                </tr>
              ) : (
                teachers.map((teacher) => (
                  <tr key={teacher._id}>
                    <td>{teacher.name}</td>
                    <td>{teacher.email}</td>
                    <td>{new Date(teacher.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default PrincipalManageTeachers;

