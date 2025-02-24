const express = require('express');
const router = express.Router();
const { getNotificationsByOrgId ,markNotificationAsRead} = require('../../controller/Notifications/getAllNotifications'); // Adjust the path to your controller

// Route to get notifications for a specific OrgId
router.get('/notifications/:orgId', getNotificationsByOrgId);
router.put('/notifications/markAsRead/:orgId', markNotificationAsRead);

module.exports = router;
