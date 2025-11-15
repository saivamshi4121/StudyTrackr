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
  const [progressFilter, setProgressFilter] = useState('all');

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

  // Get tasks to display based on active tab and progress filter
  const getDisplayTasks = () => {
    let tasks;
    switch (activeTab) {
      case 'my':
        tasks = myTasks;
        break;
      case 'students':
        tasks = studentTasks;
        break;
      default:
        tasks = allTasks;
    }

    // Apply progress filter
    if (progressFilter === 'all') {
      return tasks;
    }
    return tasks.filter((task) => task.progress === progressFilter);
  };

  const displayTasks = getDisplayTasks();

  return (
    <div className="w-full px-4 sm:px-6 py-4 sm:py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-black mb-2">Teacher Dashboard</h1>
        {user && (
          <div className="text-gray-600">
            <p>Welcome, <span className="font-semibold text-black">{user.name}</span>!</p>
            <p>Email: {user.email}</p>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="mb-6 border-b-2 border-turquoise">
        <div className="flex space-x-2">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 rounded-t-lg transition ${
              activeTab === 'all'
                ? 'bg-turquoise text-black font-semibold'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            All Tasks ({allTasks.length})
          </button>
          <button
            onClick={() => setActiveTab('my')}
            className={`px-4 py-2 rounded-t-lg transition ${
              activeTab === 'my'
                ? 'bg-turquoise text-black font-semibold'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            My Tasks ({myTasks.length})
          </button>
          <button
            onClick={() => setActiveTab('students')}
            className={`px-4 py-2 rounded-t-lg transition ${
              activeTab === 'students'
                ? 'bg-turquoise text-black font-semibold'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Students' Tasks ({studentTasks.length})
          </button>
        </div>
      </div>

      <div className="mb-6 flex items-center justify-between">
        {/* Create Task Button - only show for "My Tasks" or "All Tasks" */}
        {activeTab !== 'students' && !showForm && (
          <button onClick={() => setShowForm(true)} className="btn-primary">
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

