const express = require('express');
const router = express.Router();
const { getTasks, addTask, updateTask, deleteTask } = require('../controllers/taskController');
const { verifyToken } = require('../middleware/auth');

router.get('/', verifyToken, getTasks);
router.post('/', verifyToken, addTask);
router.put('/:taskId', verifyToken, updateTask);
router.delete('/:taskId', verifyToken, deleteTask);

module.exports = router;