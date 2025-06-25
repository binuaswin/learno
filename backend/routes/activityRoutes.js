//backend/routes/activityRoutes.js
const express = require('express');
const router = express.Router();
const { getRecentActivities, logActivity } = require('../controllers/activityController');
const { verifyToken } = require('../middleware/authMiddleware');



// Routes for /api/activities
router.route('/')
  .get(verifyToken, getRecentActivities)
  .post(verifyToken, logActivity);

module.exports = router;