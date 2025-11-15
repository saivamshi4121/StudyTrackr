const express = require('express');
const { getAssignedStudents } = require('../controllers/teacherController');
const { authenticate, authorizeRoles } = require('../middlewares/authMiddleware');

const router = express.Router();

router.use(authenticate);
router.use(authorizeRoles('teacher'));

// Get students assigned to the logged-in teacher
router.get('/students', getAssignedStudents);

module.exports = router;

