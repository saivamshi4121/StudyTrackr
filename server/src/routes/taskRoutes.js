const express = require('express');
const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} = require('../controllers/taskController');
const { authenticate, authorizeRoles } = require('../middlewares/authMiddleware');
const {
  createTaskValidators,
  updateTaskValidators,
  taskIdParamValidator,
} = require('../utils/validators/taskValidators');

const router = express.Router();

router.use(authenticate);
router.use(authorizeRoles('student', 'teacher'));

router
  .route('/')
  .get(getTasks)
  .post(createTaskValidators, createTask);

router
  .route('/:id')
  .put(updateTaskValidators, updateTask)
  .delete(taskIdParamValidator, deleteTask);

module.exports = router;

