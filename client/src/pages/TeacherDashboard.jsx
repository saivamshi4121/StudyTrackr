import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import taskService from '../services/task';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';

const TeacherDashboard = () => {
  const { user } = useAuth();
  const [allTasks, setAllTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'my', 'students'

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await taskService.getTasks();
      if (response.success) {
        setAllTasks(response.data || []);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  // Separate tasks into teacher's own tasks and students' tasks
  const myTasks = allTasks.filter((task) => String(task.userId) === String(user?.id));
  const studentTasks = allTasks.filter((task) => String(task.userId) !== String(user?.id));

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

  // Get tasks to display based on active tab
  const getDisplayTasks = () => {
    switch (activeTab) {
      case 'my':
        return myTasks;
      case 'students':
        return studentTasks;
      default:
        return allTasks;
    }
  };

  const displayTasks = getDisplayTasks();

  return (
    <div>
      <h1>Teacher Dashboard</h1>
      {user && (
        <div>
          <p>Welcome, {user.name}!</p>
          <p>Email: {user.email}</p>
        </div>
      )}

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Tabs */}
      <div style={{ margin: '1rem 0', borderBottom: '1px solid #ccc' }}>
        <button
          onClick={() => setActiveTab('all')}
          style={{
            padding: '0.5rem 1rem',
            marginRight: '0.5rem',
            border: 'none',
            background: activeTab === 'all' ? '#007bff' : '#f0f0f0',
            color: activeTab === 'all' ? 'white' : 'black',
            cursor: 'pointer',
          }}
        >
          All Tasks ({allTasks.length})
        </button>
        <button
          onClick={() => setActiveTab('my')}
          style={{
            padding: '0.5rem 1rem',
            marginRight: '0.5rem',
            border: 'none',
            background: activeTab === 'my' ? '#007bff' : '#f0f0f0',
            color: activeTab === 'my' ? 'white' : 'black',
            cursor: 'pointer',
          }}
        >
          My Tasks ({myTasks.length})
        </button>
        <button
          onClick={() => setActiveTab('students')}
          style={{
            padding: '0.5rem 1rem',
            border: 'none',
            background: activeTab === 'students' ? '#007bff' : '#f0f0f0',
            color: activeTab === 'students' ? 'white' : 'black',
            cursor: 'pointer',
          }}
        >
          Students' Tasks ({studentTasks.length})
        </button>
      </div>

      {/* Create Task Button - only show for "My Tasks" or "All Tasks" */}
      {activeTab !== 'students' && !showForm && (
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
          tasks={displayTasks}
          onUpdate={handleUpdateTask}
          onDelete={handleDeleteTask}
          readOnly={activeTab === 'students'}
          title={
            activeTab === 'my'
              ? 'My Tasks'
              : activeTab === 'students'
              ? "Students' Tasks"
              : 'All Tasks'
          }
        />
      )}
    </div>
  );
};

export default TeacherDashboard;

