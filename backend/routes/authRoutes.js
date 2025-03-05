const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { verifyToken, verifyRole } = require('../middleware/auth');
const { v4: uuidv4 } = require('uuid');
const winston = require('winston');

const saltRounds = 10; // Define as constant for clarity

// Configure winston logger
const logger = winston.createLogger({
  level: 'error',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.Console({ format: winston.format.simple() })
  ]
});

// Login route (with access and refresh tokens)
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const accessToken = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    const refreshToken = uuidv4();
    user.refreshToken = refreshToken;
    await user.save();

    res.status(200).json({ message: 'Login successful!', accessToken, refreshToken });
  } catch (error) {
    logger.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Signup route (with optional role, defaulting to 'user')
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password, role = 'user' } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const user = new User({ name, email, password: hashedPassword, role });
    await user.save();

    const accessToken = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    const refreshToken = uuidv4();
    user.refreshToken = refreshToken;
    await user.save();

    res.status(201).json({ message: 'Signup successful!', accessToken, refreshToken });
  } catch (error) {
    logger.error('Signup error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get Profile (for all authenticated users)
router.get('/profile', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    logger.error('Profile fetch error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update Profile (for all authenticated users)
router.put('/profile', verifyToken, async (req, res) => {
  try {
    const { name, email, bio, profileImage, preferences } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { name, email, bio, profileImage, preferences },
      { new: true, runValidators: true, select: '-password' }
    );
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    logger.error('Profile update error:', error);
    res.status(400).json({ message: 'Server error' });
  }
});

// Get Activities (for all authenticated users)
router.get('/activities', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('activities');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user.activities);
  } catch (error) {
    logger.error('Activities fetch error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get All Users (admin-only)
router.get('/users', verifyToken, verifyRole(['admin']), async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    logger.error('Users fetch error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update User (admin-only)
router.put('/users/:id', verifyToken, verifyRole(['admin']), async (req, res) => {
  try {
    const { name, email, role, bio, profileImage, preferences } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, role, bio, profileImage, preferences },
      { new: true, runValidators: true, select: '-password' }
    );
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    logger.error('User update error:', error);
    res.status(400).json({ message: 'Server error' });
  }
});

// Delete User (admin-only)
router.delete('/users/:id', verifyToken, verifyRole(['admin']), async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    logger.error('User delete error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Refresh Token
router.post('/refresh-token', async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(400).json({ message: 'Refresh token is required' });
    }

    const user = await User.findOne({ refreshToken });
    if (!user) {
      return res.status(403).json({ message: 'Invalid refresh token' });
    }

    const accessToken = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ accessToken });
  } catch (error) {
    logger.error('Refresh token error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Logout (clear refresh token)
router.post('/logout', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (user) {
      user.refreshToken = null;
      await user.save();
    }
    res.json({ message: 'Logged out successfully' });
  } catch (error) {
    logger.error('Logout error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;