const express = require('express');
const { saveEventAndSendEmail, getEvents ,updateEvent, deleteEvent} = require('../../controller/MeetingCalender/eventController');

const router = express.Router();

// Define routes
router.post('/events', saveEventAndSendEmail);
router.get('/events/:OrgId', getEvents);




// Update event route
router.put('/events/:id', updateEvent);

// Delete event route
router.delete('/events/:id', deleteEvent);

module.exports = router;
