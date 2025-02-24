// routes/taskEventRoutes.js
const express = require('express');
const router = express.Router();

// Importing the controller function
const { getTasksAndEvents } = require('../../controller/taskmeetingCount/taskEventController');

// Route to fetch tasks and events for a specific OrgId
router.get('/tasks-and-events', getTasksAndEvents);

module.exports = router;
