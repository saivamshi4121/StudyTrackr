const { validationResult } = require('express-validator');
const Task = require('../models/Task');
const User = require('../models/User');

const buildTeacherTaskFilter = async (teacherId) => {
  const assignedStudents = await User.find(
    { teacherId, role: 'student' },
    { _id: 1 }
  ).lean();

  const studentIds = assignedStudents.map((student) => student._id);

  return {
    $or: [{ userId: teacherId }, { userId: { $in: studentIds } }],
  };
};

const getTasks = async (req, res, next) => {
  try {
    const { id, role } = req.user;

    let filter = {};

    if (role === 'student') {
      filter = { userId: id };
    } else if (role === 'teacher') {
      filter = await buildTeacherTaskFilter(id);
    } else if (role === 'principal') {
      return res.status(403).json({ success: false, message: 'Principals cannot view tasks' });
    }

    const tasks = await Task.find(filter).sort({ createdAt: -1 }).lean();

    return res.json({ success: true, data: tasks });
  } catch (error) {
    next(error);
  }
};

const createTask = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { id, role } = req.user;

    if (role === 'principal') {
      return res.status(403).json({ success: false, message: 'Principals cannot create tasks' });
    }

    const payload = {
      title: req.body.title,
      description: req.body.description,
      dueDate: req.body.dueDate,
      progress: req.body.progress,
      userId: id,
    };

    const task = await Task.create(payload);

    return res.status(201).json({ success: true, data: task });
  } catch (error) {
    next(error);
  }
};

const ensureCanMutateTask = (role, userId, task) => {
  if (role === 'student' && String(task.userId) !== String(userId)) {
    return false;
  }

  if (role === 'teacher' && String(task.userId) !== String(userId)) {
    return false;
  }

  if (role === 'principal') {
    return false;
  }

  return true;
};

const updateTask = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { id, role } = req.user;
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }

    if (!ensureCanMutateTask(role, id, task)) {
      return res.status(403).json({ success: false, message: 'Not authorized to update this task' });
    }

    const updatableFields = ['title', 'description', 'dueDate', 'progress'];

    updatableFields.forEach((field) => {
      if (typeof req.body[field] !== 'undefined') {
        task[field] = req.body[field];
      }
    });

    await task.save();

    return res.json({ success: true, data: task });
  } catch (error) {
    next(error);
  }
};

const deleteTask = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { id, role } = req.user;
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }

    if (!ensureCanMutateTask(role, id, task)) {
      return res.status(403).json({ success: false, message: 'Not authorized to delete this task' });
    }

    await task.deleteOne();

    return res.json({ success: true, message: 'Task deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
};

