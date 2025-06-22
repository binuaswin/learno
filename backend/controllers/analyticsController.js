//backend/controllers/analyticsController.js
const asyncHandler = require('express-async-handler');
const User = require('../models/User');

const getAnalytics = asyncHandler(async (req, res) => {
  const { period = 'week' } = req.query;
  const userId = req.user._id;

  const startDate = new Date();
  startDate.setHours(0, 0, 0, 0);
  if (period === 'week') {
    startDate.setDate(startDate.getDate() - 7);
  } else if (period === 'month') {
    startDate.setDate(startDate.getDate() - 30);
  }

  const user = await User.findById(userId).select('study_tasks');
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  const tasks = user.study_tasks.filter(
    (task) => !task.completionDate || new Date(task.completionDate) >= startDate
  );

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.status === 'Completed').length;
  const pendingTasks = tasks.filter((t) => t.status === 'Pending').length;
  const inProgressTasks = tasks.filter((t) => t.status === 'In Progress').length;
  const overdueTasks = tasks.filter((t) => t.status === 'Overdue').length;
  const completionPercent = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  const subjects = [...new Set(tasks.map((t) => t.subject).filter(Boolean))];
  const studyTimeBySubject = subjects.map((subject) => ({
    subject,
    timeSpent: tasks
      .filter((t) => t.subject === subject)
      .reduce((sum, t) => sum + (t.timeSpent || 0), 0),
  }));

  const completedTasksInPeriod = tasks.filter(
    (t) => t.status === 'Completed' && new Date(t.completionDate) >= startDate
  );
  const avgTasksPerDay = completedTasksInPeriod.length / (period === 'week' ? 7 : 30);

  const mostTimeSubject = studyTimeBySubject.reduce(
    (max, { subject, timeSpent }) => (timeSpent > (max.time || 0) ? { subject, time: timeSpent } : max),
    { time: 0 }
  );

  res.json({
    totalTasks,
    completedTasks,
    pendingTasks,
    inProgressTasks,
    overdueTasks,
    completionPercent,
    studyTimeBySubject,
    avgTasksPerDay,
    mostTimeSubject,
  });
});

module.exports = { getAnalytics };