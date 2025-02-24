// routes/emailRoutes.js

const express = require('express');
const { sendEmails } = require('../../controller/BulkEmail/emailController');

const router = express.Router();

// Define the route for sending bulk emails
router.post('/send-bulk-emails', sendEmails);

module.exports = router;
