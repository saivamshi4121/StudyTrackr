import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import taskService from '../services/task';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';

const StudentDashboard = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await taskService.getTasks();
      if (response.success) {
        setTasks(response.data || []);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (taskData) => {
    try {
      setError('');
      const response = await taskService.createTask(taskData);
      if (response.success) {
        setShowForm(false);
        fetchTasks(); // Refresh list
      } else {
        setError(response.message || 'Failed to create task');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create task');
    }
  };

  const handleUpdateTask = async (taskId, taskData) => {
    try {
      setError('');
      const response = await taskService.updateTask(taskId, taskData);
      if (response.success) {
        fetchTasks(); // Refresh list
      } else {
        setError(response.message || 'Failed to update task');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update task');
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm('Are you sure you want to delete this task?')) {
      return;
    }

    try {
      setError('');
      const response = await taskService.deleteTask(taskId);
      if (response.success) {
        fetchTasks(); // Refresh list
      } else {
        setError(response.message || 'Failed to delete task');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete task');
    }
  };

  return (
    <div>
      <h1>Student Dashboard</h1>
      {user && (
        <div>
          <p>Welcome, {user.name}!</p>
          <p>Email: {user.email}</p>
        </div>
      )}

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {!showForm && (
        <button onClick={() => setShowForm(true)}>Create New Task</button>
      )}

      {showForm && (
        <TaskForm
          onSubmit={handleCreateTask}
          onCancel={() => setShowForm(false)}
        />
      )}

      {loading ? (
        <p>Loading tasks...</p>
      ) : (
        <TaskList
          tasks={tasks}
          onUpdate={handleUpdateTask}
          onDelete={handleDeleteTask}
        />
      )}
    </div>
  );
};

export default StudentDashboard;

