const User = require('../models/User');

// Public endpoint to get all teachers (for student registration)
const getTeachers = async (req, res, next) => {
  try {
    const teachers = await User.find({ role: 'teacher' })
      .select('_id name email createdAt')
      .sort({ createdAt: -1 })
      .lean();

    return res.json({
      success: true,
      data: teachers,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getTeachers,
};

