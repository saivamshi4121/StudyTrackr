import api from './api';

export const principalService = {
  // Create a teacher account
  createTeacher: async (teacherData) => {
    const response = await api.post('/principal/teachers', teacherData);
    return response.data;
  },

  // Get all teachers
  getTeachers: async () => {
    const response = await api.get('/principal/teachers');
    return response.data;
  },
};

export default principalService;

