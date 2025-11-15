import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import taskService from '../services/task';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import LoadingSpinner from '../components/LoadingSpinner';

const StudentDashboard = () => {
  const { user } = useAuth();
  const { showError, showSuccess } = useToast();
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [progressFilter, setProgressFilter] = useState('all');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await taskService.getTasks();
      if (response.success) {
        setTasks(response.data || []);
      }
    } catch (err) {
      showError(err.response?.data?.message || 'Failed to fetch tasks. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (taskData) => {
    try {
      setActionLoading(true);
      const response = await taskService.createTask(taskData);
      if (response.success) {
        showSuccess('Task created successfully!');
        setShowForm(false);
        fetchTasks(); // Refresh list
      } else {
        showError(response.message || 'Failed to create task');
      }
    } catch (err) {
      showError(err.response?.data?.message || 'Failed to create task. Please try again.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleUpdateTask = async (taskId, taskData) => {
    try {
      setActionLoading(true);
      const response = await taskService.updateTask(taskId, taskData);
      if (response.success) {
        showSuccess('Task updated successfully!');
        fetchTasks(); // Refresh list
      } else {
        showError(response.message || 'Failed to update task');
      }
    } catch (err) {
      showError(err.response?.data?.message || 'Failed to update task. Please try again.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm('Are you sure you want to delete this task?')) {
      return;
    }

    try {
      setActionLoading(true);
      const response = await taskService.deleteTask(taskId);
      if (response.success) {
        showSuccess('Task deleted successfully!');
        fetchTasks(); // Refresh list
      } else {
        showError(response.message || 'Failed to delete task');
      }
    } catch (err) {
      showError(err.response?.data?.message || 'Failed to delete task. Please try again.');
    } finally {
      setActionLoading(false);
    }
  };

  // Filter tasks by progress
  useEffect(() => {
    if (progressFilter === 'all') {
      setFilteredTasks(tasks);
    } else {
      setFilteredTasks(tasks.filter((task) => task.progress === progressFilter));
    }
  }, [tasks, progressFilter]);

  return (
    <div className="w-full px-6 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-black mb-2">Student Dashboard</h1>
        {user && (
          <div className="text-gray-600">
            <p>Welcome, <span className="font-semibold text-black">{user.name}</span>!</p>
            <p>Email: {user.email}</p>
          </div>
        )}
      </div>

      <div className="mb-6 flex items-center justify-between">
        {!showForm && (
          <button onClick={() => setShowForm(true)} disabled={actionLoading} className="btn-primary">
            Create New Task
          </button>
        )}
        
        {/* Progress Filter */}
        <div className="flex items-center space-x-2">
          <label htmlFor="progressFilter" className="text-sm font-medium text-gray-700">
            Filter by Progress:
          </label>
          <select
            id="progressFilter"
            value={progressFilter}
            onChange={(e) => setProgressFilter(e.target.value)}
            className="input w-auto"
          >
            <option value="all">All Tasks</option>
            <option value="not-started">Not Started</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      {showForm && (
        <TaskForm
          onSubmit={handleCreateTask}
          onCancel={() => setShowForm(false)}
        />
      )}

      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          {actionLoading && <LoadingSpinner size="small" />}
          <TaskList
            tasks={filteredTasks}
            onUpdate={handleUpdateTask}
            onDelete={handleDeleteTask}
          />
        </>
      )}
    </div>
  );
};

export default StudentDashboard;

