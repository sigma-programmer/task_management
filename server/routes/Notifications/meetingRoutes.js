const express = require('express');
const { scheduleMeeting } = require('../../notifications/meetingController');

const router = express.Router();

router.post('/schedule', scheduleMeeting);

module.exports = router;
