const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');  // Adjust the path if needed
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');


// Update User Profile Route
router.put('/api/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email, and password are required." });
    }

    // Find user by ID
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found." });

    // Check if the email is already taken by another user
    const existingUser = await User.findOne({ email });
    if (existingUser && existingUser._id.toString() !== userId) {
      return res.status(400).json({ message: "Email is already in use." });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update user details
    user.name = name;
    user.email = email;
    user.password = hashedPassword;

    await user.save();

    res.status(200).json({ message: "User profile updated successfully." });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});
// Protected route: Only authenticated users can access this route.
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    // The user data attached to req.user can be used here
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
