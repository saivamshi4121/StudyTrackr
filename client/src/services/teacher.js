import axios from 'axios';

// Note: For student registration, we need a public endpoint to fetch teachers
// Currently, the backend only has /api/principal/teachers which requires principal role
// TODO: Add a public GET /api/teachers endpoint in the backend for student registration

const API_BASE_URL = 'http://localhost:5000/api';

export const teacherService = {
  // Get all teachers (for student registration dropdown)
  // This attempts to fetch teachers without authentication
  // In production, create a public GET /api/teachers endpoint
  getTeachers: async () => {
    try {
      // Try public endpoint first (if it exists)
      const response = await axios.get(`${API_BASE_URL}/teachers`);
      return response.data;
    } catch (error) {
      // If public endpoint doesn't exist, return empty array
      // Backend needs: GET /api/teachers (public) that returns list of teachers
      console.warn('Public teachers endpoint not available. Please add GET /api/teachers endpoint.');
      return { success: false, data: [] };
    }
  },
};

export default teacherService;

