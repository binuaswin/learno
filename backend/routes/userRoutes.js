//backend/routes/userRoutes.js
const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../middleware/upload');

const router = express.Router();

// Update User Profile
router.put('/api/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found.' });

    const existingUser = await User.findOne({ email });
    if (existingUser && existingUser._id.toString() !== userId) {
      return res.status(400).json({ message: 'Email is already in use.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user.name = name;
    user.email = email;
    user.password = hashedPassword;

    await user.save();
    res.status(200).json({ message: 'User profile updated successfully.' });
  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

// Get Authenticated User Profile
router.get('/api/user/profile', authMiddleware(), async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found.' });

    res.json(user);
  } catch (error) {
    console.error('Fetch profile error:', error);
    res.status(500).json({ message: 'Server error.' });
  }
});

// 🔄 Upload Profile Picture
router.post('/api/user/upload-profile-pic', authMiddleware(), upload.single('profilePic'), async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found.' });

    user.profilePic = req.file.path; // save relative path to DB
    await user.save();

    res.status(200).json({
      message: 'Profile picture uploaded successfully.',
      profilePic: req.file.path
    });
  } catch (error) {
    console.error('Profile pic upload error:', error);
    res.status(500).json({ message: 'Failed to upload profile picture.' });
  }
});

module.exports = router;
