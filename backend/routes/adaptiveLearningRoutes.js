const express = require('express');
const router = express.Router();
const { getAdaptiveLearningData, updateAdaptiveLearningData, updateLearningGoal, startModule, updateRecommendation, updateTimeSpent, submitQuiz, submitExercise, addGoal, incrementStreak, updateLearningMode, updateMilestone, addReflection, addFeedback, addReminder, dismissAlert } = require('../controllers/adaptiveLearningController');
const { verifyToken } = require('../middleware/authMiddleware');

router.get('/', verifyToken, getAdaptiveLearningData);
router.put('/', verifyToken, updateAdaptiveLearningData);
router.put('/learningGoal', verifyToken, updateLearningGoal);
router.post('/startModule', verifyToken, startModule);
router.post('/recommendation', verifyToken, updateRecommendation);
router.post('/timeSpent', verifyToken, updateTimeSpent);
router.post('/quiz', verifyToken, submitQuiz);
router.post('/exercise', verifyToken, submitExercise);
router.post('/goal', verifyToken, addGoal);
router.post('/streak', verifyToken, incrementStreak);
router.post('/learningMode', verifyToken, updateLearningMode);
router.post('/milestone', verifyToken, updateMilestone);
router.post('/reflection', verifyToken, addReflection);
router.post('/feedback', verifyToken, addFeedback);
router.post('/reminder', verifyToken, addReminder);
router.post('/dismissAlert', verifyToken, dismissAlert);

module.exports = router;