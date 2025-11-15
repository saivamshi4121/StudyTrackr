const express = require('express');

const authRoutes = require('./authRoutes');
const taskRoutes = require('./taskRoutes');
const principalRoutes = require('./principalRoutes');
const userRoutes = require('./userRoutes');

const router = express.Router();

// Public routes first (before authenticated routes)
router.use('/', userRoutes); // Public user routes (e.g., /api/teachers)

// Authenticated routes
router.use('/auth', authRoutes);
router.use('/tasks', taskRoutes);
router.use('/principal', principalRoutes);

router.get('/health', (req, res) => {
  res.json({ success: true, message: 'Server is healthy' });
});

module.exports = router;

