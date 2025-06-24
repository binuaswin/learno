const asyncHandler = require('express-async-handler');
const User = require('../models/User');

const getAdaptiveLearningData = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select('adaptive_learning username preferences.learningGoal');
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }
  res.json({
    userName: user.username,
    learningGoal: user.preferences.learningGoal,
    learningData: user.adaptive_learning || {},
  });
});

const updateAdaptiveLearningData = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }
  user.adaptive_learning = { ...user.adaptive_learning, ...req.body };
  await user.save();
  res.json({ learningData: user.adaptive_learning });
});

const updateLearningGoal = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }
  user.preferences = user.preferences || {};
  user.preferences.learningGoal = req.body.learningGoal || user.preferences.learningGoal;
  await user.save();
  res.json({ learningGoal: user.preferences.learningGoal });
});

const startModule = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }
  const { moduleTitle } = req.body;
  if (!moduleTitle) {
    res.status(400);
    throw new Error('Module title is required');
  }
  user.adaptive_learning.activeModules = user.adaptive_learning.activeModules || [];
  if (!user.adaptive_learning.activeModules.includes(moduleTitle)) {
    user.adaptive_learning.activeModules.push(moduleTitle);
    await user.save();
  }
  res.json({ message: `Started module: ${moduleTitle}` });
});

const updateRecommendation = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }
  const { moduleTitle, action } = req.body;
  if (!moduleTitle || !action) {
    res.status(400);
    throw new Error('Module title and action are required');
  }
  user.adaptive_learning.recommendations = user.adaptive_learning.recommendations || [];
  if (action === 'remove') {
    user.adaptive_learning.recommendations = user.adaptive_learning.recommendations.filter(
      (rec) => rec.moduleTitle !== moduleTitle
    );
  } else if (action === 'add') {
    const { difficulty } = req.body;
    if (!difficulty) {
      res.status(400);
      throw new Error('Difficulty is required for adding a recommendation');
    }
    user.adaptive_learning.recommendations.push({ moduleTitle, difficulty });
  } else {
    res.status(400);
    throw new Error('Invalid action');
  }
  await user.save();
  res.json({ recommendations: user.adaptive_learning.recommendations });
});

const updateTimeSpent = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }
  const { task, hours } = req.body;
  if (!task || typeof hours !== 'number' || hours < 0) {
    res.status(400);
    throw new Error('Task and valid hours are required');
  }
  user.adaptive_learning.timeSpent = user.adaptive_learning.timeSpent || [];
  const existingTask = user.adaptive_learning.timeSpent.find((t) => t.task === task);
  if (existingTask) {
    existingTask.hours += hours;
  } else {
    user.adaptive_learning.timeSpent.push({ task, hours });
  }
  await user.save();
  res.json({ timeSpent: user.adaptive_learning.timeSpent });
});

const submitQuiz = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }
  const { title, score } = req.body;
  if (!title || typeof score !== 'number' || score < 0 || score > 100) {
    res.status(400);
    throw new Error('Valid quiz title and score (0-100) are required');
  }
  user.adaptive_learning.quizzes = user.adaptive_learning.quizzes || [];
  user.adaptive_learning.quizzes.push({ title, score, date: new Date() });
  await user.save();
  res.json({ quizzes: user.adaptive_learning.quizzes });
});

const submitExercise = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }
  const { title, result } = req.body;
  if (!title || !['Correct', 'Incorrect', 'Pending'].includes(result)) {
    res.status(400);
    throw new Error('Valid exercise title and result (Correct/Incorrect/Pending) are required');
  }
  user.adaptive_learning.exercises = user.adaptive_learning.exercises || [];
  user.adaptive_learning.exercises.push({ title, result, date: new Date() });
  await user.save();
  res.json({ exercises: user.adaptive_learning.exercises });
});

const addGoal = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }
  const { skill, target } = req.body;
  if (!skill || !['Beginner', 'Intermediate', 'Advanced'].includes(target)) {
    res.status(400);
    throw new Error('Valid skill name and target level (Beginner/Intermediate/Advanced) are required');
  }
  user.adaptive_learning.goals = user.adaptive_learning.goals || [];
  user.adaptive_learning.goals.push({ skill, target, progress: 0 });
  await user.save();
  res.json({ goals: user.adaptive_learning.goals });
});

const incrementStreak = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }
  user.adaptive_learning.streak = (user.adaptive_learning.streak || 0) + 1;
  await user.save();
  res.json({ streak: user.adaptive_learning.streak });
});

const updateLearningMode = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }
  const { pace, contentFormat, learningStyle } = req.body;
  if (!['Slow', 'Moderate', 'Fast'].includes(pace) ||
      !['Videos', 'Articles', 'Interactive'].includes(contentFormat) ||
      !['Visual', 'Auditory', 'Reading/Writing', 'Kinesthetic'].includes(learningStyle)) {
    res.status(400);
    throw new Error('Invalid learning mode preferences');
  }
  user.adaptive_learning.learningMode = { pace, contentFormat, learningStyle };
  await user.save();
  res.json({ learningMode: user.adaptive_learning.learningMode });
});

const updateMilestone = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }
  const { title, achieved } = req.body;
  if (!title || typeof achieved !== 'boolean') {
    res.status(400);
    throw new Error('Valid milestone title and achieved status are required');
  }
  user.adaptive_learning.milestones = user.adaptive_learning.milestones || [];
  const milestone = user.adaptive_learning.milestones.find((m) => m.title === title);
  if (!milestone) {
    res.status(404);
    throw new Error('Milestone not found');
  }
  milestone.achieved = achieved;
  await user.save();
  res.json({ milestones: user.adaptive_learning.milestones });
});

const addReflection = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }
  const { module, note } = req.body;
  if (!module || !note) {
    res.status(400);
    throw new Error('Module and note are required');
  }
  user.adaptive_learning.reflection = user.adaptive_learning.reflection || [];
  user.adaptive_learning.reflection.push({ module, note, date: new Date() });
  await user.save();
  res.json({ reflection: user.adaptive_learning.reflection });
});

const addFeedback = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }
  const { module, comment, rating } = req.body;
  if (!module || !comment || !rating || rating < 1 || rating > 5) {
    res.status(400);
    throw new Error('Module, comment, and rating (1-5) are required');
  }
  user.adaptive_learning.feedback = user.adaptive_learning.feedback || [];
  user.adaptive_learning.feedback.push({ module, comment, rating });
  await user.save();
  res.json({ feedback: user.adaptive_learning.feedback });
});

const addReminder = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }
  const { task, dueDate, time } = req.body;
  if (!task || !dueDate || !time) {
    res.status(400);
    throw new Error('Task, due date, and time are required');
  }
  user.adaptive_learning.reminders = user.adaptive_learning.reminders || [];
  user.adaptive_learning.reminders.push({ task, dueDate, time });
  await user.save();
  res.json({ reminders: user.adaptive_learning.reminders });
});

const dismissAlert = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }
  const { message } = req.body;
  if (!message) {
    res.status(400);
    throw new Error('Alert message is required');
  }
  user.adaptive_learning.alerts = user.adaptive_learning.alerts || [];
  user.adaptive_learning.alerts = user.adaptive_learning.alerts.filter(
    (alert) => alert.message !== message
  );
  await user.save();
  res.json({ alerts: user.adaptive_learning.alerts });
});

module.exports = { getAdaptiveLearningData, updateAdaptiveLearningData, updateLearningGoal, startModule, updateRecommendation, updateTimeSpent, submitQuiz, submitExercise, addGoal, incrementStreak, updateLearningMode, updateMilestone, addReflection, addFeedback, addReminder, dismissAlert };