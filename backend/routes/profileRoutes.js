//backend/routes/profileRoutes.js
const express = require('express');
const router = express.Router();

const { verifyToken, verifyRole } = require('../middleware/auth');
const uploadMiddleware = require('../middleware/upload');
const { getProfile, updateProfile } = require('../controllers/profileController');

// GET: Fetch logged-in user's profile
router.get('/me', verifyToken, getProfile);

// PUT: Update logged-in user's profile
router.put('/me', verifyToken, uploadMiddleware, (req, res, next) => {
  console.log('Profile update request received:', {
    body: req.body,
    file: req.file ? { filename: req.file.filename, size: req.file.size } : 'No file',
  });
  updateProfile(req, res, next);
});

// GET: General dashboard (for any authenticated user)
router.get('/dashboard', verifyToken, (req, res) => {
  res.status(200).json({
    success: true,
    message: `Welcome ${req.user?.role || 'user'}! You have access.`,
    role: req.user?.role,
    userId: req.user?.id,
  });
});

// GET: Admin-only route
router.get('/admin', verifyToken, verifyRole(['admin']), (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Admin access granted.',
    adminId: req.user?.id,
  });
});

module.exports = router;