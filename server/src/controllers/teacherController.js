const User = require('../models/User');

// Get students assigned to a teacher
const getAssignedStudents = async (req, res, next) => {
  try {
    const { id } = req.user; // Teacher's ID from JWT

    const students = await User.find({ teacherId: id, role: 'student' })
      .select('_id name email createdAt')
      .sort({ createdAt: -1 })
      .lean();

    return res.json({
      success: true,
      data: students,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAssignedStudents,
};

