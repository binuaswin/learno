const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const Task = require('../models/Task');

const getQuickStats = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  if (userId !== req.user._id.toString()) {
    res.status(403);
    throw new Error('Forbidden: Cannot access stats for another user');
  }

  const user = await User.findById(userId).select('completedModules skills goals');
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  const tasks = await Task.find({ user: userId });
  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;

  const learningProgress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  res.status(200).json({
    learningProgress,
    skillsLearned: user.skills || [],
    upcomingGoals: user.goals || [],
    completedTasks,
    totalTasks,
  });
});

module.exports = { getQuickStats };