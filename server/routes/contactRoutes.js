// routes/contactRoutes.js

const express = require('express');
const router = express.Router();
const contactController = require('../controller/contactController');

// Route to handle POST request to create a new contact
router.post('/', contactController.createContact);

module.exports = router;
