const express = require('express');

const authRoutes = require('./authRoutes');

const router = express.Router();

router.use('/auth', authRoutes);

router.get('/health', (req, res) => {
  res.json({ success: true, message: 'Server is healthy' });
});

module.exports = router;

