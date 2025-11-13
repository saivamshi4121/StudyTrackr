const { body, param } = require('express-validator');
const { PROGRESS_STATES_ARRAY } = require('../constants');

const baseTaskValidators = [
  body('title').optional().trim().notEmpty().withMessage('Title is required'),
  body('description').optional().trim(),
  body('dueDate')
    .optional()
    .isISO8601()
    .withMessage('dueDate must be a valid ISO date')
    .toDate(),
  body('progress')
    .optional()
    .isIn(PROGRESS_STATES_ARRAY)
    .withMessage(`Progress must be one of: ${PROGRESS_STATES_ARRAY.join(', ')}`),
];

const createTaskValidators = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  ...baseTaskValidators.slice(1),
];

const updateTaskValidators = [
  param('id').isMongoId().withMessage('Invalid task id'),
  ...baseTaskValidators,
];

const taskIdParamValidator = [param('id').isMongoId().withMessage('Invalid task id')];

module.exports = {
  createTaskValidators,
  updateTaskValidators,
  taskIdParamValidator,
};

