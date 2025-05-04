const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const logger = require('../logger');

// Get user preferences
const getPreferences = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).select('preferences email');
  if (!user) {
    logger.error(`User not found: ${req.user.id}`);
    res.status(404);
    throw new Error('User not found');
  }
  res.json({ preferences: user.preferences, user: { email: user.email } });
});

// Update user preferences
const updatePreferences = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    logger.error(`User not found: ${req.user.id}`);
    res.status(404);
    throw new Error('User not found');
  }

  // Validate request body
  const allowedFields = ['theme', 'notifications', 'language', 'timeZone', 'privacy'];
  const preferences = {};
  for (const key of allowedFields) {
    if (req.body[key] !== undefined) {
      preferences[key] = req.body[key];
    }
  }

  // Validate notifications structure
  if (preferences.notifications) {
    const validNotifications = ['taskReminders', 'skillUpdates', 'email', 'push', 'level'];
    preferences.notifications = Object.fromEntries(
      Object.entries(preferences.notifications).filter(([k]) => validNotifications.includes(k))
    );
  }

  // Validate privacy structure
  if (preferences.privacy) {
    const validPrivacy = ['profileVisibility', 'activityVisibility'];
    preferences.privacy = Object.fromEntries(
      Object.entries(preferences.privacy).filter(([k]) => validPrivacy.includes(k))
    );
  }

  if (Object.keys(preferences).length === 0) {
    logger.warn(`No valid preferences provided for user: ${req.user.id}`);
    res.status(400);
    throw new Error('No valid preferences provided');
  }

  try {
    user.preferences = { ...user.preferences, ...preferences };
    await user.save();
    logger.info(`Preferences updated for user: ${req.user.id}`);
    res.json({ preferences: user.preferences });
  } catch (error) {
    logger.error(`Failed to update preferences for user: ${req.user.id}`, {
      error: error.message,
      stack: error.stack,
    });
    res.status(500);
    throw new Error('Failed to update preferences');
  }
});

module.exports = { getPreferences, updatePreferences };