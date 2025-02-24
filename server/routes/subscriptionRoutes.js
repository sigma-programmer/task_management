// routes/subscriptionRoutes.js
const express = require('express');
const router = express.Router();
const subscriptionController = require('../controller/subscriptionController');

router.post('/', subscriptionController.subscribe);

module.exports = router;
