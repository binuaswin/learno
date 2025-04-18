//backend/controllers/taslcontrollers.js
const User = require('../models/User');

exports.getTasks = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('study_tasks');
    const today = new Date().toISOString().split('T')[0];
    user.study_tasks.forEach((task) => {
      if (task.deadline < today && task.status === 'Pending') {
        task.status = 'Overdue';
      }
    });
    await user.save();
    res.status(200).json({ tasks: user.study_tasks || [] });
  } catch (error) {
    console.error('Get tasks error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.addTask = async (req, res) => {
  try {
    const { task_id, title, deadline, priority, status } = req.body;
    if (!title || !deadline) {
      return res.status(400).json({ message: 'Title and deadline are required' });
    }
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const task = { task_id, title, deadline, priority, status: status || 'Pending' };
    user.study_tasks.push(task);
    await user.save();
    res.status(201).json({ task });
  } catch (error) {
    console.error('Add task error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { task_id } = req.params;
    const { title, deadline, priority, status } = req.body;
    if (!title || !deadline) {
      return res.status(400).json({ message: 'Title and deadline are required' });
    }
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const taskIndex = user.study_tasks.findIndex((t) => t.task_id === task_id);
    if (taskIndex === -1) {
      return res.status(404).json({ message: 'Task not found' });
    }
    user.study_tasks[taskIndex] = { task_id, title, deadline, priority, status };
    await user.save();
    res.status(200).json({ task: user.study_tasks[taskIndex] });
  } catch (error) {
    console.error('Update task error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const { task_id } = req.params;
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    user.study_tasks = user.study_tasks.filter((t) => t.task_id !== task_id);
    await user.save();
    res.status(200).json({ message: 'Task deleted' });
  } catch (error) {
    console.error('Delete task error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};