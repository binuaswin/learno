const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { v4: uuidv4 } = require('uuid');
const logger = require('../logger'); // Import winston logger

const saltRounds = 10;

router.post('/signup', async (req, res) => {
  try {
    logger.info('Signup request:', req.body);
    const { name, email, password, role = 'user' } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required' });
    }

    const existingUser = await User.findOne({ email });
    logger.info('Existing user check:', existingUser);
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);
    logger.info('Hashed password:', hashedPassword);
    const user = new User({ name, email, password: hashedPassword, role });
    await user.save();
    logger.info('User saved:', user);

    const accessToken = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    const refreshToken = uuidv4();
    user.refreshToken = refreshToken;
    await user.save();
    logger.info('Tokens generated:', { accessToken, refreshToken });

    res.status(201).json({ message: 'Signup successful!', accessToken, refreshToken });
  } catch (error) {
    logger.error('Signup error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    logger.info('Login request:', req.body);
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await User.findOne({ email });
    logger.info('User found:', user);
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    logger.info('Password match:', isMatch);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const accessToken = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    const refreshToken = uuidv4();
    user.refreshToken = refreshToken;
    await user.save();
    logger.info('Tokens generated:', { accessToken, refreshToken });

    res.status(200).json({ message: 'Login successful!', accessToken, refreshToken });
  } catch (error) {
    logger.error('Login error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.get('/profile', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    logger.info('Authorization header:', authHeader);
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No token provided or invalid format' });
    }

    const token = authHeader.split(' ')[1];
    logger.info('Extracted token:', token);
    if (!token || typeof token !== 'string' || !token.includes('.')) {
      return res.status(401).json({ message: 'Malformed token' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json(user);
  } catch (error) {
    logger.error('Profile fetch error:', error.message);
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Invalid token', error: error.message });
    }
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.post('/refresh-token', async (req, res) => {
  try {
    const { refreshToken } = req.body;
    logger.info('Refresh token request:', { refreshToken });
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
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;