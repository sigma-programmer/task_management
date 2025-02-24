// routes/userRouter.js
const express = require('express');
const router = express.Router();
const { requestPasswordReset, resetPassword } = require('../../controller/ResetPass/ResetPass');

// Route for requesting password reset (sends OTP)
router.post('/request-password-reset', requestPasswordReset);

// Route for resetting the password using OTP
router.post('/reset-password', resetPassword);

module.exports = router;
