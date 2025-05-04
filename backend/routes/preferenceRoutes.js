const express = require('express');
const router = express.Router();
const { getPreferences, updatePreferences } = require('../controllers/preferenceController');
const { verifyToken } = require('../middleware/auth');

router.get('/preferences', verifyToken, getPreferences);
router.put('/preferences', verifyToken, updatePreferences);

module.exports = router;