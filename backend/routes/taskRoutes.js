const express = require('express');
const Task = require('../models/taskModel');  // Import the Task model
const router = express.Router();

// Create Task Route
router.post('/api/tasks', async (req, res) => {
  try {
    const { userId, title, description, dueDate, priority } = req.body;

    if (!userId || !title || !description || !dueDate || !priority) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const newTask = new Task({
      userId,
      title,
      description,
      dueDate,
      priority,
      status: "Pending", // Default status
    });

    await newTask.save();

    res.status(201).json({ message: "Task created successfully." });
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ message: "Server error. Please try again." });
  }
});

// Update Task Route
router.put('/api/tasks/:taskId', async (req, res) => {
  try {
    const { taskId } = req.params;
    const { title, description, dueDate, priority, status } = req.body;

    const task = await Task.findById(taskId);
    if (!task) return res.status(404).json({ message: "Task not found." });

    // Update task details
    task.title = title || task.title;
    task.description = description || task.description;
    task.dueDate = dueDate || task.dueDate;
    task.priority = priority || task.priority;
    task.status = status || task.status;

    await task.save();

    res.status(200).json({ message: "Task updated successfully." });
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ message: "Server error. Please try again." });
  }
});

// Delete Task Route
router.delete('/api/tasks/:taskId', async (req, res) => {
  try {
    const { taskId } = req.params;

    const task = await Task.findByIdAndDelete(taskId);
    if (!task) return res.status(404).json({ message: "Task not found." });

    res.status(200).json({ message: "Task deleted successfully." });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ message: "Server error. Please try again." });
  }
});

module.exports = router;
