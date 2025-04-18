//backend/routes/taskRoutes.js
const express = require('express');
const router = express.Router();
const { getTasks, addTask, updateTask, deleteTask } = require('../controllers/taskController');
const { verifyToken } = require('../middleware/auth');

router.get('/', verifyToken, getTasks);
router.post('/', verifyToken, addTask);
router.put('/:task_id', verifyToken, updateTask);
router.delete('/:task_id', verifyToken, deleteTask);

module.exports = router;