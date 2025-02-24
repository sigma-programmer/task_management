const express = require('express');
const router = express.Router();
const { sendOtp, verifyOtp } = require('../../controller/AuthController');

// Route to send OTP to email
router.post('/signup-send-otp', sendOtp);

// Route to verify OTP and complete the registration process
router.post('/signup-verify-otp', verifyOtp);

module.exports = router;
