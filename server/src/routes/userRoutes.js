const express = require('express');
const { getTeachers } = require('../controllers/userController');

const router = express.Router();

// Public endpoint for fetching teachers (needed for student registration)
router.get('/teachers', getTeachers);

module.exports = router;

