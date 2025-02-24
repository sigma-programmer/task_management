// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../../controller/LoginControl');

// Route for user sign-in
router.post('/signin-intaskr', authController.signIn);

module.exports = router;
