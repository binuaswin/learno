//backend/controllers/activityController.js
const User = require('../models/User');
const { v4: uuidv4 } = require('uuid');

// Log a new activity
const logActivity = async (req, res) => {
  try {
    const { icon, description } = req.body;
    if (!description) {
      return res.status(400).json({ message: 'Activity description is required' });
    }
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const newActivity = {
      id: uuidv4(),
      icon: icon || '📌',
      description,
      timestamp: new Date(),
    };
    user.recentActivities.push(newActivity);
    if (user.recentActivities.length > 10) {
      user.recentActivities = user.recentActivities.slice(-10);
    }
    await user.save();
    res.status(201).json({ message: 'Activity logged', activity: newActivity });
  } catch (error) {
    console.error('Error logging activity:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get recent activities for the user
const getRecentActivities = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('recentActivities');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user.recentActivities);
  } catch (error) {
    console.error('Error fetching recent activities:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  logActivity,
  getRecentActivities,
};