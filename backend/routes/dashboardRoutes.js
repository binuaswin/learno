const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/authMiddleware');
const { getQuickStats } = require('../controllers/dashboardController');

router.route('/quick-stats/:userId').get(verifyToken, getQuickStats);

module.exports = router;
