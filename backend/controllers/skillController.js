//backend/controllers/skillController.js
const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const logger = require('../logger');

const getSkills = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).select('learning_progress');
  if (!user) {
    logger.error(`User not found: ${req.user.id}`);
    res.status(404);
    throw new Error('User not found');
  }
  res.status(200).json({ skills: user.learning_progress });
});

const addSkill = asyncHandler(async (req, res) => {
  const { skillName, category, skill_id, level, progress } = req.body;

  if (!skillName || !skill_id) {
    logger.error(`Invalid skill input for user ${req.user.id}: ${JSON.stringify(req.body)}`);
    res.status(400);
    throw new Error('Skill name and ID are required');
  }

  const user = await User.findById(req.user.id);
  if (!user) {
    logger.error(`User not found: ${req.user.id}`);
    res.status(404);
    throw new Error('User not found');
  }

  const skillExists = user.learning_progress.some((s) => s.name === skillName);
  if (skillExists) {
    logger.error(`Skill already exists: ${skillName} for user ${req.user.id}`);
    res.status(400);
    throw new Error('Skill already added');
  }

  const newSkill = {
    skill_id,
    name: skillName.trim(),
    category: category || 'Technical',
    level: level || 'Beginner',
    progress: Number(progress) || 0,
  };

  user.learning_progress.push(newSkill);
  await user.save();

  logger.info(`Skill added: ${skillName} for user ${req.user.id}`);
  res.status(201).json({ skill: newSkill });
});

const updateSkill = asyncHandler(async (req, res) => {
  const { id } = req.params; // skill_id
  const { skillName, category, level, progress } = req.body;

  if (!skillName) {
    logger.error(`Invalid skill update input for user ${req.user.id}: ${JSON.stringify(req.body)}`);
    res.status(400);
    throw new Error('Skill name is required');
  }

  const user = await User.findById(req.user.id);
  if (!user) {
    logger.error(`User not found: ${req.user.id}`);
    res.status(404);
    throw new Error('User not found');
  }

  const skill = user.learning_progress.find((s) => s.skill_id === id);
  if (!skill) {
    logger.error(`Skill not found: ${id} for user ${req.user.id}`);
    res.status(404);
    throw new Error('Skill not found');
  }

  skill.name = skillName.trim();
  skill.category = category || skill.category;
  skill.level = level || skill.level;
  skill.progress = progress !== undefined ? Number(progress) : skill.progress;

  await user.save();
  logger.info(`Skill updated: ${skillName} for user ${req.user.id}`);
  res.status(200).json({ skill });
});

const deleteSkill = asyncHandler(async (req, res) => {
  const { id } = req.params; // skill_id

  const user = await User.findById(req.user.id);
  if (!user) {
    logger.error(`User not found: ${req.user.id}`);
    res.status(404);
    throw new Error('User not found');
  }

  const skillIndex = user.learning_progress.findIndex((s) => s.skill_id === id);
  if (skillIndex === -1) {
    logger.error(`Skill not found: ${id} for user ${req.user.id}`);
    res.status(404);
    throw new Error('Skill not found');
  }

  user.learning_progress.splice(skillIndex, 1);
  await user.save();

  logger.info(`Skill deleted: ${id} for user ${req.user.id}`);
  res.status(200).json({ message: 'Skill deleted' });
});

module.exports = { getSkills, addSkill, updateSkill, deleteSkill };