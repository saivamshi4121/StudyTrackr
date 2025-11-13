const express = require('express');
const { createTeacher, getTeachers } = require('../controllers/principalController');
const { authenticate, authorizeRoles } = require('../middlewares/authMiddleware');
const { createTeacherValidators } = require('../utils/validators/principalValidators');

const router = express.Router();

router.use(authenticate);
router.use(authorizeRoles('principal'));

router.post('/teachers', createTeacherValidators, createTeacher);
router.get('/teachers', getTeachers);

module.exports = router;

