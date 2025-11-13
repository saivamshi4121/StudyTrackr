const express = require('express');
const { signup, login } = require('../controllers/authController');
const { signupValidators, loginValidators } = require('../utils/validators/authValidators');

const router = express.Router();

router.post('/signup', signupValidators, signup);
router.post('/login', loginValidators, login);

module.exports = router;

