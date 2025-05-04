//backend/controllers/taskController.js
const User = require('../models/User');
const { v4: uuidv4 } = require('uuid');

exports.getTasks = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('study_tasks');
    const today = new Date();
    user.study_tasks.forEach((task) => {
      if (task.deadline && new Date(task.deadline) < today && task.status === 'Pending') {
        task.status = 'Overdue';
      }
    });
    await user.save();
    res.status(200).json({ tasks: user.study_tasks || [] });
  } catch (error) {
    console.error('Get tasks error:', error.message);
    res.status(500).json({ message: 'Failed to fetch tasks', error: error.message });
  }
};
exports.filterTasks = async (req, res) => {
  try {
    const { subject, priority, status, dueDate } = req.query;
    const user = await User.findById(req.user.id).select('study_tasks');
    let filteredTasks = user.study_tasks || [];
    if (subject) filteredTasks = filteredTasks.filter((t) => t.subject === subject);
    if (priority) filteredTasks = filteredTasks.filter((t) => t.priority === priority);
    if (status) {
      const normalizedStatus = status === 'In Progress' ? 'Pending' : status;
      filteredTasks = filteredTasks.filter((t) => t.status === normalizedStatus);
    }
    if (dueDate) filteredTasks = filteredTasks.filter((t) => new Date(t.dueDate).toISOString().split('T')[0] === dueDate);
    res.status(200).json({ tasks: filteredTasks });
  } catch (error) {
    console.error('Filter tasks error:', error.message);
    res.status(500).json({ message: 'Failed to filter tasks', error: error.message });
  }
};

exports.addTask = async (req, res) => {
  try {
    const { title, dueDate, priority, subject, status, timeSpent, completion, timeEstimate } = req.body;
    if (!title || !dueDate) {
      return res.status(400).json({ message: 'Title and due date are required' });
    }
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const task = {
      _id: uuidv4(),
      title,
      dueDate: new Date(dueDate),
      priority: priority || 'Medium',
      subject: subject || '',
      status: status === 'In Progress' ? 'Pending' : status || 'Pending',
      timeSpent: timeSpent || 0,
      completion: completion || 0,
      timeEstimate: timeEstimate || 0,
    };
    user.study_tasks.push(task);
    await user.save();
    res.status(201).json({ tasks: [task] });
  } catch (error) {
    console.error('Add task error:', error.message);
    res.status(500).json({ message: 'Failed to add task', error: error.message });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { title, dueDate, priority, subject, status, timeSpent, completion, timeEstimate } = req.body;
    if (!title || !dueDate) {
      return res.status(400).json({ message: 'Title and due date are required' });
    }
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const taskIndex = user.study_tasks.findIndex((t) => t._id === taskId);
    if (taskIndex === -1) {
      return res.status(404).json({ message: 'Task not found' });
    }
    user.study_tasks[taskIndex] = {
      _id: taskId,
      title,
      dueDate: new Date(dueDate),
      priority: priority || user.study_tasks[taskIndex].priority,
      subject: subject || user.study_tasks[taskIndex].subject,
      status: status === 'In Progress' ? 'Pending' : status || user.study_tasks[taskIndex].status,
      timeSpent: timeSpent !== undefined ? timeSpent : user.study_tasks[taskIndex].timeSpent,
      completion: completion !== undefined ? completion : user.study_tasks[taskIndex].completion,
      timeEstimate: timeEstimate !== undefined ? timeEstimate : user.study_tasks[taskIndex].timeEstimate,
      completionDate: status === 'Completed' ? new Date() : user.study_tasks[taskIndex].completionDate,
    };
    await user.save();
    res.status(200).json({ tasks: [user.study_tasks[taskIndex]] });
  } catch (error) {
    console.error('Update task error:', error.message);
    res.status(500).json({ message: 'Failed to update task', error: error.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const taskIndex = user.study_tasks.findIndex((t) => t._id === taskId);
    if (taskIndex === -1) {
      return res.status(404).json({ message: 'Task not found' });
    }
    user.study_tasks.splice(taskIndex, 1);
    await user.save();
    res.status(200).json({ message: 'Task deleted' });
  } catch (error) {
    console.error('Delete task error:', error.message);
    res.status(500).json({ message: 'Failed to delete task', error: error.message });
  }
};
exports.setReminder = async (req, res) => {
  try {
    const { taskId, message, time, type } = req.body;
    if (!taskId || !message || !time) {
      return res.status(400).json({ message: 'Task ID, message, and time are required' });
    }
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const reminder = {
      _id: uuidv4(),
      taskId,
      message,
      time: new Date(time),
      type: type || 'custom',
    };
    user.reminders.push(reminder);
    await user.save();
    res.status(201).json({ reminder });
  } catch (error) {
    console.error('Set reminder error:', error.message);
    res.status(500).json({ message: 'Failed to set reminder', error: error.message });
  }
};