import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import taskService from '../services/task';
import Modal from '../components/Modal';
import TaskForm from '../components/TaskForm';
import LoadingSpinner from '../components/LoadingSpinner';

const StudentDashboard = () => {
  const { user } = useAuth();
  const { showError, showSuccess } = useToast();
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [progressFilter, setProgressFilter] = useState('all');
  const [teacherInfo, setTeacherInfo] = useState(null);

  useEffect(() => {
    fetchTasks();
    if (user?.teacherId) {
      fetchTeacherInfo();
    }
  }, [user]);

  const fetchTeacherInfo = async () => {
    try {
      // Fetch teacher info using teacherId
      // Note: This assumes there's an endpoint to get user by ID, or we can include it in the user context
      // For now, we'll use the teacherId from user object
      if (user.teacherId) {
        // If teacher info is not in user context, we might need to fetch it
        // For now, we'll just display the ID
        setTeacherInfo({ id: user.teacherId, name: 'Loading...' });
      }
    } catch (err) {
      console.error('Failed to fetch teacher info:', err);
    }
  };

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
        setShowModal(false);
        fetchTasks();
      } else {
        showError(response.message || 'Failed to create task');
      }
    } catch (err) {
      showError(err.response?.data?.message || 'Failed to create task. Please try again.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleUpdateProgress = async (taskId, newProgress) => {
    try {
      setActionLoading(true);
      const response = await taskService.updateTask(taskId, { progress: newProgress });
      if (response.success) {
        showSuccess('Task progress updated!');
        fetchTasks();
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
        fetchTasks();
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

  // Calculate stats
  const stats = {
    total: tasks.length,
    completed: tasks.filter((t) => t.progress === 'completed').length,
    inProgress: tasks.filter((t) => t.progress === 'in-progress').length,
    notStarted: tasks.filter((t) => t.progress === 'not-started').length,
  };

  const getProgressBadgeClass = (progress) => {
    switch (progress) {
      case 'not-started':
        return 'bg-gray-300 text-black';
      case 'in-progress':
        return 'bg-orange text-white';
      case 'completed':
        return 'bg-turquoise text-black';
      default:
        return 'bg-gray-300 text-black';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="w-full min-h-screen bg-white px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-black mb-2">
            Welcome, {user?.name || 'Student'}!
          </h1>
          <p className="text-gray-600 text-lg">
            Your tasks assigned under Teacher:{' '}
            <span className="font-semibold text-black">
              {teacherInfo?.name || user?.teacherId || 'N/A'}
            </span>
          </p>
          <p className="text-sm text-gray-500 mt-1">Role: Student</p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white border-2 border-turquoise rounded-xl p-4 shadow-sm">
            <div className="text-3xl font-bold text-black mb-1">{stats.total}</div>
            <div className="text-sm text-gray-600">Total Tasks</div>
          </div>
          <div className="bg-white border-2 border-turquoise rounded-xl p-4 shadow-sm">
            <div className="text-3xl font-bold text-turquoise mb-1">{stats.completed}</div>
            <div className="text-sm text-gray-600">Completed</div>
          </div>
          <div className="bg-white border-2 border-orange rounded-xl p-4 shadow-sm">
            <div className="text-3xl font-bold text-orange mb-1">{stats.inProgress}</div>
            <div className="text-sm text-gray-600">In Progress</div>
          </div>
          <div className="bg-white border-2 border-gray-300 rounded-xl p-4 shadow-sm">
            <div className="text-3xl font-bold text-gray-600 mb-1">{stats.notStarted}</div>
            <div className="text-sm text-gray-600">Not Started</div>
          </div>
        </div>

        {/* Filter + Add Task Button */}
        <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <label htmlFor="progressFilter" className="text-sm font-medium text-gray-700">
              Filter:
            </label>
            <select
              id="progressFilter"
              value={progressFilter}
              onChange={(e) => setProgressFilter(e.target.value)}
              className="input w-auto min-w-[150px]"
            >
              <option value="all">All Tasks</option>
              <option value="not-started">Not Started</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <button
            onClick={() => setShowModal(true)}
            disabled={actionLoading}
            className="btn-primary px-6 py-2.5 text-base font-semibold"
          >
            + Add Task
          </button>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <LoadingSpinner />
          </div>
        ) : (
          <>
            {/* Task Grid */}
            {filteredTasks.length === 0 ? (
              <div className="bg-white border-2 border-dashed border-gray-300 rounded-xl p-12 text-center">
                <div className="text-6xl mb-4">📋</div>
                <h3 className="text-xl font-semibold text-black mb-2">No tasks yet</h3>
                <p className="text-gray-600 mb-6">
                  {progressFilter === 'all'
                    ? "Click 'Add Task' to create your first task."
                    : `No tasks found with status: ${progressFilter.replace('-', ' ')}`}
                </p>
                {progressFilter !== 'all' && (
                  <button
                    onClick={() => setProgressFilter('all')}
                    className="text-orange hover:text-black transition font-medium"
                  >
                    Show all tasks
                  </button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTasks.map((task) => (
                  <div
                    key={task._id}
                    className="bg-white border-l-4 border-turquoise rounded-lg shadow-md p-5 hover:shadow-lg transition"
                  >
                    {/* Task Header */}
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-semibold text-black flex-1 pr-2">
                        {task.title}
                      </h3>
                      <button
                        onClick={() => handleDeleteTask(task._id)}
                        className="text-red-500 hover:text-red-700 transition text-lg font-bold"
                        title="Delete task"
                        disabled={actionLoading}
                      >
                        ×
                      </button>
                    </div>

                    {/* Description */}
                    {task.description && (
                      <p className="text-gray-600 mb-4 line-clamp-2 text-sm">
                        {task.description}
                      </p>
                    )}

                    {/* Due Date */}
                    {task.dueDate && (
                      <div className="mb-4">
                        <p className="text-sm text-gray-500">
                          <span className="font-medium">Due:</span>{' '}
                          <span className="text-black">{formatDate(task.dueDate)}</span>
                        </p>
                      </div>
                    )}

                    {/* Progress Badge + Dropdown */}
                    <div className="flex items-center justify-between gap-3 mb-3">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getProgressBadgeClass(
                          task.progress
                        )}`}
                      >
                        {task.progress.replace('-', ' ')}
                      </span>
                    </div>

                    {/* Progress Dropdown */}
                    <div className="mb-3">
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Update Progress:
                      </label>
                      <select
                        value={task.progress}
                        onChange={(e) => handleUpdateProgress(task._id, e.target.value)}
                        disabled={actionLoading}
                        className="input text-sm"
                      >
                        <option value="not-started">Not Started</option>
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                      </select>
                    </div>

                    {/* Created Date */}
                    <p className="text-xs text-gray-400 mt-4 pt-3 border-t border-gray-100">
                      Created: {formatDate(task.createdAt)}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Action Loading Indicator */}
            {actionLoading && (
              <div className="fixed bottom-4 right-4 bg-black text-white px-4 py-2 rounded-lg shadow-lg">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Processing...</span>
                </div>
              </div>
            )}
          </>
        )}

        {/* Modal for Creating Task */}
        <Modal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          title="Create New Task"
        >
          <TaskForm
            onSubmit={handleCreateTask}
            onCancel={() => setShowModal(false)}
          />
        </Modal>
      </div>
    </div>
  );
};

export default StudentDashboard;
