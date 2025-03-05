const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');
const User = require('./models/User'); // ✅ Correct

// Example: Admin route to get all users
router.get('/users', authMiddleware, roleMiddleware(['admin']), async (req, res) => {
  try {
    const users = await User.find().select('-password'); // Exclude sensitive data
    res.json(users);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;