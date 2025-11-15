import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import taskService from '../services/task';
import Modal from '../components/Modal';
import TaskForm from '../components/TaskForm';
import LoadingSpinner from '../components/LoadingSpinner';

const TeacherDashboard = () => {
  const { user } = useAuth();
  const { showError, showSuccess } = useToast();
  const [allTasks, setAllTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [taskFilter, setTaskFilter] = useState('all'); // 'all', 'my', 'students'
  const [progressFilter, setProgressFilter] = useState('all'); // 'all', 'not-started', 'in-progress', 'completed'
  const [assignedStudents, setAssignedStudents] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, [user]);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await taskService.getTasks();
      if (response.success) {
        const tasks = response.data || [];
        setAllTasks(tasks);
        
        // Extract unique student IDs from tasks
        const studentIds = new Set();
        tasks.forEach((task) => {
          if (String(task.userId) !== String(user?.id)) {
            studentIds.add(task.userId);
          }
        });
        setAssignedStudents(Array.from(studentIds));
      }
    } catch (err) {
      showError(err.response?.data?.message || 'Failed to fetch tasks. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Separate tasks
  const myTasks = allTasks.filter((task) => String(task.userId) === String(user?.id));
  const studentTasks = allTasks.filter((task) => String(task.userId) !== String(user?.id));

  // Check if task belongs to teacher
  const isMyTask = (task) => String(task.userId) === String(user?.id);

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

  // Apply filters
  useEffect(() => {
    let tasksToFilter = [];

    // First filter by task ownership
    if (taskFilter === 'my') {
      tasksToFilter = myTasks;
    } else if (taskFilter === 'students') {
      tasksToFilter = studentTasks;
    } else {
      tasksToFilter = allTasks;
    }

    // Then filter by progress
    if (progressFilter === 'all') {
      setFilteredTasks(tasksToFilter);
    } else {
      setFilteredTasks(tasksToFilter.filter((task) => task.progress === progressFilter));
    }
  }, [allTasks, taskFilter, progressFilter, myTasks, studentTasks]);

  // Calculate stats
  const stats = {
    myTasks: myTasks.length,
    studentTasks: studentTasks.length,
    completed: allTasks.filter((t) => t.progress === 'completed').length,
    inProgress: allTasks.filter((t) => t.progress === 'in-progress').length,
    notStarted: allTasks.filter((t) => t.progress === 'not-started').length,
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
            Welcome, {user?.name || 'Teacher'}!
          </h1>
          <p className="text-gray-600 text-lg">
            Managing <span className="font-semibold text-black">{assignedStudents.length}</span> assigned students
          </p>
          <p className="text-sm text-gray-500 mt-1">Role: Teacher</p>
        </div>

        {/* Assigned Students List */}
        {assignedStudents.length > 0 && (
          <div className="mb-6 bg-gray-50 border border-gray-200 rounded-xl p-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Assigned Students:</h3>
            <div className="flex flex-wrap gap-2">
              {assignedStudents.map((studentId, index) => (
                <span
                  key={index}
                  className="inline-block bg-white border border-turquoise text-black px-3 py-1 rounded-full text-xs font-medium"
                >
                  Student ID: {String(studentId).substring(0, 8)}...
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-white border-2 border-turquoise rounded-xl p-4 shadow-sm">
            <div className="text-2xl md:text-3xl font-bold text-black mb-1">{stats.myTasks}</div>
            <div className="text-xs md:text-sm text-gray-600">Your Tasks</div>
          </div>
          <div className="bg-white border-2 border-orange rounded-xl p-4 shadow-sm">
            <div className="text-2xl md:text-3xl font-bold text-orange mb-1">{stats.studentTasks}</div>
            <div className="text-xs md:text-sm text-gray-600">Student Tasks</div>
          </div>
          <div className="bg-white border-2 border-turquoise rounded-xl p-4 shadow-sm">
            <div className="text-2xl md:text-3xl font-bold text-turquoise mb-1">{stats.completed}</div>
            <div className="text-xs md:text-sm text-gray-600">Completed</div>
          </div>
          <div className="bg-white border-2 border-orange rounded-xl p-4 shadow-sm">
            <div className="text-2xl md:text-3xl font-bold text-orange mb-1">{stats.inProgress}</div>
            <div className="text-xs md:text-sm text-gray-600">In Progress</div>
          </div>
          <div className="bg-white border-2 border-gray-300 rounded-xl p-4 shadow-sm">
            <div className="text-2xl md:text-3xl font-bold text-gray-600 mb-1">{stats.notStarted}</div>
            <div className="text-xs md:text-sm text-gray-600">Not Started</div>
          </div>
        </div>

        {/* Filter + Add Task Button */}
        <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full sm:w-auto">
            {/* Task Filter */}
            <div className="flex items-center space-x-2">
              <label htmlFor="taskFilter" className="text-sm font-medium text-gray-700">
                Filter:
              </label>
              <select
                id="taskFilter"
                value={taskFilter}
                onChange={(e) => setTaskFilter(e.target.value)}
                className="input w-auto min-w-[140px]"
              >
                <option value="all">All Tasks</option>
                <option value="my">Your Tasks</option>
                <option value="students">Student Tasks</option>
              </select>
            </div>

            {/* Progress Filter */}
            <div className="flex items-center space-x-2">
              <label htmlFor="progressFilter" className="text-sm font-medium text-gray-700">
                Progress:
              </label>
              <select
                id="progressFilter"
                value={progressFilter}
                onChange={(e) => setProgressFilter(e.target.value)}
                className="input w-auto min-w-[140px]"
              >
                <option value="all">All Progress</option>
                <option value="not-started">Not Started</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>

          <button
            onClick={() => setShowModal(true)}
            disabled={actionLoading}
            className="btn-primary px-6 py-2.5 text-base font-semibold w-full sm:w-auto"
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
                <div className="text-6xl mb-4">📚</div>
                <h3 className="text-xl font-semibold text-black mb-2">No tasks available</h3>
                <p className="text-gray-600 mb-6">
                  {taskFilter === 'all' && progressFilter === 'all'
                    ? "Create your first task to get started."
                    : `No tasks found matching the selected filters.`}
                </p>
                {(taskFilter !== 'all' || progressFilter !== 'all') && (
                  <button
                    onClick={() => {
                      setTaskFilter('all');
                      setProgressFilter('all');
                    }}
                    className="text-orange hover:text-black transition font-medium"
                  >
                    Clear filters
                  </button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTasks.map((task) => {
                  const isOwnTask = isMyTask(task);
                  return (
                    <div
                      key={task._id}
                      className={`bg-white border-l-4 rounded-lg shadow-md p-5 hover:shadow-lg transition ${
                        isOwnTask ? 'border-turquoise' : 'border-orange'
                      }`}
                    >
                      {/* Task Header with Creator Label */}
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1 pr-2">
                          <h3 className="text-xl font-semibold text-black mb-1">{task.title}</h3>
                          <span
                            className={`inline-block text-xs font-medium px-2 py-1 rounded ${
                              isOwnTask
                                ? 'bg-turquoise/20 text-turquoise'
                                : 'bg-orange/20 text-orange'
                            }`}
                          >
                            {isOwnTask ? 'You' : `Student: ${String(task.userId).substring(0, 8)}...`}
                          </span>
                        </div>
                        {isOwnTask && (
                          <button
                            onClick={() => handleDeleteTask(task._id)}
                            className="text-red-500 hover:text-red-700 transition text-lg font-bold"
                            title="Delete task"
                            disabled={actionLoading}
                          >
                            ×
                          </button>
                        )}
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

                      {/* Progress Badge */}
                      <div className="flex items-center justify-between gap-3 mb-3">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getProgressBadgeClass(
                            task.progress
                          )}`}
                        >
                          {task.progress.replace('-', ' ')}
                        </span>
                      </div>

                      {/* Progress Dropdown - Only for teacher's own tasks */}
                      {isOwnTask && (
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
                      )}

                      {/* Read-only indicator for student tasks */}
                      {!isOwnTask && (
                        <div className="mb-3">
                          <p className="text-xs text-gray-400 italic">
                            Read-only (Student task)
                          </p>
                        </div>
                      )}

                      {/* Created Date */}
                      <p className="text-xs text-gray-400 mt-4 pt-3 border-t border-gray-100">
                        Created: {formatDate(task.createdAt)}
                      </p>
                    </div>
                  );
                })}
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

export default TeacherDashboard;
