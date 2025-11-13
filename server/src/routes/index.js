const express = require('express');

const authRoutes = require('./authRoutes');
const taskRoutes = require('./taskRoutes');
const principalRoutes = require('./principalRoutes');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/tasks', taskRoutes);
router.use('/principal', principalRoutes);

router.get('/health', (req, res) => {
  res.json({ success: true, message: 'Server is healthy' });
});

module.exports = router;

