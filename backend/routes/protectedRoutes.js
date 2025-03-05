const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Protected route (only logged-in users can access)
router.get('/dashboard', authMiddleware(), (req, res) => {
  res.json({ message: `Welcome ${req.user.role}! You have access.` });
});

// Admin-only route
router.get('/admin', authMiddleware(['admin']), (req, res) => {
  res.json({ message: 'Admin access granted.' });
});

module.exports = router;
