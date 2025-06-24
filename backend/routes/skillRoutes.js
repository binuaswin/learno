//backend/routes/skillRoutes.js
const express = require('express');
const router = express.Router();
const { getSkills, addSkill, updateSkill, deleteSkill, getAnalytics, getChartData, getSkillPlan } = require('../controllers/skillController');
const { verifyToken } = require('../middleware/authMiddleware');

router.get('/', verifyToken, getSkills);
router.post('/', verifyToken, addSkill);
router.put('/:id', verifyToken, updateSkill);
router.delete('/:id', verifyToken, deleteSkill);
router.get('/analytics', verifyToken, getAnalytics);
router.get('/charts', verifyToken, getChartData);
router.get('/plan', verifyToken, getSkillPlan);

module.exports = router;