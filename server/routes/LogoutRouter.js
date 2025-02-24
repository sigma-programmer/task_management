const express = require('express');
const router = express.Router();
const logoutController = require('../controller/logoutController');

// Define the logout route
router.post('/logout', logoutController.logout);

module.exports = router;
