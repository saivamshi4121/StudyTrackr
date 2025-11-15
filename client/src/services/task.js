import api from './api';

export const taskService = {
  // Get all tasks
  getTasks: async () => {
    const response = await api.get('/tasks');
    return response.data;
  },

  // Create a task
  createTask: async (taskData) => {
    const response = await api.post('/tasks', taskData);
    return response.data;
  },

  // Update a task
  updateTask: async (taskId, taskData) => {
    const response = await api.put(`/tasks/${taskId}`, taskData);
    return response.data;
  },

  // Delete a task
  deleteTask: async (taskId) => {
    const response = await api.delete(`/tasks/${taskId}`);
    return response.data;
  },
};

export default taskService;

