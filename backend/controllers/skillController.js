//backend/controllers/skillController.js
const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const logger = require('../logger');

const getSkills = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select('learning_progress');
  if (!user) {
    logger.error(`[${new Date().toISOString()}] User not found: ${req.user._id}`);
    res.status(404);
    throw new Error('User not found');
  }
  logger.info(`[${new Date().toISOString()}] Fetched skills for user ${req.user._id}`);
  res.status(200).json({ skills: user.learning_progress || [] });
});

const addSkill = asyncHandler(async (req, res) => {
  const { name, category, skill_id, level, progress } = req.body;

  if (!name || !skill_id) {
    logger.error(`[${new Date().toISOString()}] Invalid skill input for user ${req.user._id}: ${JSON.stringify(req.body)}`);
    res.status(400);
    throw new Error('Skill name and ID are required');
  }

  const validCategories = ['Technical', 'Soft Skills', 'Creative', 'Other'];
  if (category && !validCategories.includes(category)) {
    logger.error(`[${new Date().toISOString()}] Invalid category for user ${req.user._id}: ${category}`);
    res.status(400);
    throw new Error('Invalid category');
  }

  if (progress !== undefined && (progress < 0 || progress > 100)) {
    logger.error(`[${new Date().toISOString()}] Invalid progress for user ${req.user._id}: ${progress}`);
    res.status(400);
    throw new Error('Progress must be between 0 and 100');
  }

  const user = await User.findById(req.user._id);
  if (!user) {
    logger.error(`[${new Date().toISOString()}] User not found: ${req.user._id}`);
    res.status(404);
    throw new Error('User not found');
  }

  const skillExists = user.learning_progress.some((s) => s.name === name || s.skill_id === skill_id);
  if (skillExists) {
    logger.error(`[${new Date().toISOString()}] Skill already exists: ${name} or skill_id ${skill_id} for user ${req.user._id}`);
    res.status(400);
    throw new Error('Skill name or ID already exists');
  }

  const newSkill = {
    skill_id,
    name: name.trim(),
    category: category || 'Technical',
    level: level || 'Beginner',
    progress: Number(progress) || 0,
    createdAt: new Date(),
  };

  user.learning_progress.push(newSkill);
  await user.save();

  logger.info(`[${new Date().toISOString()}] Skill added: ${name} (ID: ${skill_id}) for user ${req.user._id}`);
  res.status(201).json({ skill: newSkill });
});

const updateSkill = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, category, level, progress } = req.body;

  if (!name) {
    logger.error(`[${new Date().toISOString()}] Invalid skill update input for user ${req.user._id}: ${JSON.stringify(req.body)}`);
    res.status(400);
    throw new Error('Skill name is required');
  }

  const validCategories = ['Technical', 'Soft Skills', 'Creative', 'Other'];
  if (category && !validCategories.includes(category)) {
    logger.error(`[${new Date().toISOString()}] Invalid category for user ${req.user._id}: ${category}`);
    res.status(400);
    throw new Error('Invalid category');
  }

  if (progress !== undefined && (progress < 0 || progress > 100)) {
    logger.error(`[${new Date().toISOString()}] Invalid progress for user ${req.user._id}: ${progress}`);
    res.status(400);
    throw new Error('Progress must be between 0 and 100');
  }

  const user = await User.findById(req.user._id);
  if (!user) {
    logger.error(`[${new Date().toISOString()}] User not found: ${req.user._id}`);
    res.status(404);
    throw new Error('User not found');
  }

  const skill = user.learning_progress.find((s) => s.skill_id === id);
  if (!skill) {
    logger.error(`[${new Date().toISOString()}] Skill not found: ${id} for user ${req.user._id}`);
    res.status(404);
    throw new Error('Skill not found');
  }

  skill.name = name.trim();
  skill.category = category || skill.category;
  skill.level = level || skill.level;
  skill.progress = progress !== undefined ? Number(progress) : skill.progress;

  await user.save();
  logger.info(`[${new Date().toISOString()}] Skill updated: ${name} (ID: ${id}) for user ${req.user._id}`);
  res.status(200).json({ skill });
});

const deleteSkill = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(req.user._id);
  if (!user) {
    logger.error(`[${new Date().toISOString()}] User not found: ${req.user._id}`);
    res.status(404);
    throw new Error('User not found');
  }

  const skillIndex = user.learning_progress.findIndex((s) => s.skill_id === id);
  if (skillIndex === -1) {
    logger.error(`[${new Date().toISOString()}] Skill not found: ${id} for user ${req.user._id}`);
    res.status(404);
    throw new Error('Skill not found');
  }

  user.learning_progress.splice(skillIndex, 1);
  await user.save();

  logger.info(`[${new Date().toISOString()}] Skill deleted: ${id} for user ${req.user._id}`);
  res.status(200).json({ message: 'Skill deleted' });
});

const getAnalytics = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select('learning_progress');
  if (!user) {
    logger.error(`[${new Date().toISOString()}] User not found: ${req.user._id}`);
    res.status(404);
    throw new Error('User not found');
  }

  const skills = user.learning_progress || [];
  const timeSpentData = skills.map((skill) => ({
    skill: skill.name,
    timeSpent: skill.progress * 0.5 || 10,
  }));

  const progressStats = skills.map((skill) => ({
    skill: skill.name,
    averageTime: skill.progress * 0.3 || 5,
    completedExercises: Math.floor(skill.progress / 10) || 1,
  }));

  const months = ['January', 'February', 'March', 'April', 'May'];
  const comparativeData = {
    labels: months,
    datasets: skills.slice(0, 2).map((skill, index) => ({
      label: `${skill.name} Progress`,
      data: months.map(() => Math.floor(skill.progress * (0.5 + index * 0.1))),
      borderColor: index === 0 ? 'rgba(255, 99, 132, 1)' : 'rgba(54, 162, 235, 1)',
      fill: false,
    })),
  };

  logger.info(`[${new Date().toISOString()}] Fetched analytics for user ${req.user._id}`);
  res.status(200).json({ timeSpentData, progressStats, comparativeData });
});

const getChartData = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select('learning_progress');
  if (!user) {
    logger.error(`[${new Date().toISOString()}] User not found: ${req.user._id}`);
    res.status(404);
    throw new Error('User not found');
  }

  const skills = user.learning_progress || [];
  logger.debug(`[${new Date().toISOString()}] Chart data for user ${req.user._id}: ${skills.length} skills found`);

  // Category Distribution (Pie Chart)
  const categories = ['Technical', 'Soft Skills', 'Creative', 'Other'];
  const categoryCounts = categories.map((cat) => 
    skills.filter((skill) => skill.category === cat).length
  );
  const categoryData = {
    labels: categories.filter((_, i) => categoryCounts[i] > 0),
    datasets: [{
      data: categoryCounts.filter(count => count > 0),
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
      borderWidth: 1,
    }],
  };

  // Progress Over Time (Line Chart)
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  const progressData = {
    labels: months,
    datasets: skills.slice(0, 1).map((skill) => ({
      label: `${skill.name} Progress`,
      data: months.map((_, i) => {
        const created = new Date(skill.createdAt);
        const monthDiff = (new Date().getMonth() + 1) - (created.getMonth() + 1) + i;
        return monthDiff >= 0 ? skill.progress * (0.5 + monthDiff * 0.1) : 0;
      }),
      fill: false,
      borderColor: '#36A2EB',
      tension: 0.1,
    })),
  };

  // Mastery Levels (Bar Chart)
  const levelMap = { Beginner: 1, Intermediate: 2, Advanced: 3 };
  const masteryData = {
    labels: skills.map((skill) => skill.name),
    datasets: [{
      label: 'Skills Mastery Levels',
      data: skills.map((skill) => levelMap[skill.level] || 1),
      backgroundColor: skills.map((_, i) => ['#FF6384', '#36A2EB', '#FFCE56'][i % 3]),
    }],
  };

  logger.info(`[${new Date().toISOString()}] Fetched chart data for user ${req.user._id}`);
  res.status(200).json({ categoryData, progressData, masteryData });
});

module.exports = { getSkills, addSkill, updateSkill, deleteSkill, getAnalytics, getChartData };