const asyncHandler = require('express-async-handler');
const Skill = require('../models/skillModel');

exports.getSkills = asyncHandler(async (req, res) => {
  const skills = await Skill.find({ user: req.user.id });
  res.status(200).json({ skills });
});

exports.addSkill = asyncHandler(async (req, res) => {
  const { skillName, category, description, targetLevel, deadline } = req.body;

  if (!skillName) {
    res.status(400);
    throw new Error('Skill name is required');
  }

  const skill = await Skill.create({
    user: req.user.id,
    skillName,
    category,
    description,
    targetLevel,
    deadline,
  });

  res.status(201).json({ success: true, skill });
});

exports.updateSkill = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { skillName, category, description, targetLevel, deadline } = req.body;

  if (!skillName) {
    res.status(400);
    throw new Error('Skill name is required');
  }

  const skill = await Skill.findById(id);
  if (!skill) {
    res.status(404);
    throw new Error('Skill not found');
  }

  if (skill.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('Not authorized to update this skill');
  }

  skill.skillName = skillName;
  skill.category = category;
  skill.description = description;
  skill.targetLevel = targetLevel;
  skill.deadline = deadline;

  await skill.save();
  res.status(200).json({ skill });
});

exports.deleteSkill = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const skill = await Skill.findById(id);
  if (!skill) {
    res.status(404);
    throw new Error('Skill not found');
  }

  if (skill.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('Not authorized to delete this skill');
  }

  await skill.remove();
  res.status(200).json({ message: 'Skill deleted' });
});