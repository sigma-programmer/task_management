// routes/taskRoutes.js
const express = require('express');
const router = express.Router();
const taskController = require('../../controller/Task/taskController');

// Create a new task
router.post('/taskcreate', taskController.createTask);

// Get all tasks for a user
router.get('/alltask/:userId', taskController.getTasks);

// Update a task by ID
router.put('/updatetask/:userId/:taskId', taskController.updateTask);

// Delete a task by ID
router.delete('/deletetask/:taskId', taskController.deleteTask);

module.exports = router;
