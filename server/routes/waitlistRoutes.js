// waitlistRoutes.js
const express = require('express');
const router = express.Router();
const waitlistController = require('../controller/waitlistController');

router.post('/', waitlistController.createWaitlistEntry);

module.exports = router;
