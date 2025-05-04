const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');
const User = require('../models/User');
const upload = require('../middleware/upload');

router.get('/:id/settings', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('preferences');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user.preferences);
  } catch (error) {
    console.error('Get settings error:', error.message);
    res.status(500).json({ message: 'Failed to fetch settings', error: error.message });
  }
});

router.put('/:id/settings', verifyToken, async (req, res) => {
  try {
    const { timeZone, notificationSettings } = req.body;
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    user.preferences = { ...user.preferences, timeZone, notificationSettings };
    await user.save();
    res.json(user.preferences);
  } catch (error) {
    console.error('Update settings error:', error.message);
    res.status(500).json({ message: 'Failed to update settings', error: error.message });
  }
});

router.post('/:id/reminders', verifyToken, async (req, res) => {
  try {
    const { taskId, message, time } = req.body;
    if (!taskId || !message || !time) {
      return res.status(400).json({ message: 'Task ID, message, and time are required' });
    }
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    const reminder = { taskId, message, time: new Date(time), _id: require('uuid').v4() };
    user.activities.push({ action: `Reminder set: ${message}`, timestamp: Date.now() });
    await user.save();
    res.json(reminder);
  } catch (error) {
    console.error('Set reminder error:', error.message);
    res.status(500).json({ message: 'Failed to set reminder', error: error.message });
  }
});

router.post('/:id/categories', verifyToken, async (req, res) => {
  try {
    const { category } = req.body;
    if (!category) return res.status(400).json({ message: 'Category is required' });
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    user.activities.push({ action: `Category added: ${category}`, timestamp: Date.now() });
    await user.save();
    res.json({ message: 'Category added', category });
  } catch (error) {
    console.error('Add category error:', error.message);
    res.status(500).json({ message: 'Failed to add category', error: error.message });
  }
});

router.post('/:id/sync', verifyToken, async (req, res) => {
  try {
    const { tasks, settings } = req.body;
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    if (tasks) {
      user.study_tasks = tasks.map(task => ({
        ...task,
        _id: task._id || require('uuid').v4(),
        deadline: task.deadline ? new Date(task.deadline) : undefined,
      }));
    }
    if (settings) user.preferences = settings;
    await user.save();
    res.json({ message: 'Data synced' });
  } catch (error) {
    console.error('Sync data error:', error.message);
    res.status(500).json({ message: 'Failed to sync data', error: error.message });
  }
});

router.put('/:userId', verifyToken, async (req, res) => {
  try {
    const { userId } = req.params;
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required' });
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    if (userId !== req.user.id.toString()) {
      return res.status(403).json({ message: 'Unauthorized to update this user' });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser && existingUser._id.toString() !== userId) {
      return res.status(400).json({ message: 'Email is already in use' });
    }
    user.name = name;
    user.email = email;
    user.password = password;
    await user.save();
    res.status(200).json({ message: 'User profile updated successfully' });
  } catch (error) {
    console.error('Profile update error:', error.message);
    res.status(500).json({ message: 'Failed to update profile', error: error.message });
  }
});

router.get('/profile', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    console.error('Fetch profile error:', error.message);
    res.status(500).json({ message: 'Failed to fetch profile', error: error.message });
  }
});

router.post('/upload-profile-pic', verifyToken, upload.single('profileImage'), async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    const relativePath = `/Uploads/${req.file.filename}`;
    user.profileImage = relativePath;
    await user.save();
    res.status(200).json({
      message: 'Profile picture uploaded successfully',
      profileImage: relativePath,
    });
  } catch (error) {
    console.error('Profile pic upload error:', error.message);
    res.status(500).json({ message: 'Failed to upload profile picture', error: error.message });
  }
});

module.exports = router;