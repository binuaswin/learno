//backend/controllers/profileController.js
const User = require('../models/User');

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password -refreshToken');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ user });
  } catch (error) {
    console.error('Get profile error:', error.message);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    const allowedFields = [
      'name',
      'username',
      'email',
      'phone',
      'bio',
      'location',
      'preferences',
    ];

    const updates = {};
    for (const key of allowedFields) {
      if (req.body[key]) {
        updates[key] = req.body[key];
      }
    }

    if (req.file) {
      updates.profileImage = `/uploads/${req.file.filename}`;
      console.log('Profile image set:', updates.profileImage);
    }

    console.log('Updating user ID:', req.user.id, 'with:', updates);

    if (Object.keys(updates).length === 0) {
      console.log('No changes detected');
      return res.status(200).json({ message: 'No changes to update', user: await User.findById(req.user.id).select('-password -refreshToken') });
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { $set: updates },
      { new: true, runValidators: true }
    ).select('-password -refreshToken');

    if (!updatedUser) {
      console.log('User not found for ID:', req.user.id);
      return res.status(404).json({ message: 'User not found' });
    }

    console.log('Updated user:', updatedUser);

    res.status(200).json({ message: 'Profile updated successfully', user: updatedUser });
  } catch (error) {
    console.error('Update profile error:', error.message);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: 'Validation failed', error: error.message });
    }
    res.status(500).json({ message: 'Failed to update profile', error: error.message });
  }
};

module.exports = { getProfile, updateProfile };