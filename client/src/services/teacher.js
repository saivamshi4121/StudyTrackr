import api from './api';

export const teacherService = {
  // Get students assigned to the logged-in teacher
  getAssignedStudents: async () => {
    const response = await api.get('/teacher/students');
    return response.data;
  },
};

export default teacherService;
