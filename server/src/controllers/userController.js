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

// Get user by ID (for fetching teacher info)
const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select('_id name email role').lean();

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    return res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getTeachers,
  getUserById,
};
