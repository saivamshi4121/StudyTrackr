const express = require('express');
const { getTeachers, getUserById } = require('../controllers/userController');

const router = express.Router();

// Public endpoint for fetching teachers (needed for student registration)
router.get('/teachers', getTeachers);

// Public endpoint to get user by ID (for fetching teacher info)
router.get('/users/:id', getUserById);

module.exports = router;

