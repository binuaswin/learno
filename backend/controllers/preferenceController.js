const asyncHandler = require('express-async-handler');
const User = require('../models/User');

// Get user settings
const getSettings = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('preferences');
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }
  if (user._id.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('Unauthorized: Cannot access another user\'s settings');
  }
  res.json({ settings: user.preferences });
});

// Update user settings
const updateSettings = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }
  if (user._id.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('Unauthorized: Cannot update another user\'s settings');
  }
  user.preferences = { ...user.preferences, ...req.body };
  await user.save();
  res.json({ settings: user.preferences });
});

module.exports = { getSettings, updateSettings };