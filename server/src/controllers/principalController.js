const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const User = require('../models/User');

const createTeacher = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists',
      });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const teacher = await User.create({
      name,
      email,
      passwordHash,
      role: 'teacher',
    });

    return res.status(201).json({
      success: true,
      message: 'Teacher created successfully',
      teacher: {
        id: teacher._id,
        name: teacher.name,
        email: teacher.email,
        role: teacher.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

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
  createTeacher,
  getTeachers,
};

