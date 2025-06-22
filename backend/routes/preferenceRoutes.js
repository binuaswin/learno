const express = require('express');
const router = express.Router();
const { getSettings, updateSettings } = require('../controllers/preferenceController');
const { verifyToken } = require('../middleware/authMiddleware');

router.get('/:id/settings', verifyToken, getSettings);
router.put('/:id/settings', verifyToken, updateSettings);

module.exports = router;