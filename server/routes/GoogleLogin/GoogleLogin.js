const express = require('express');
const { googleLogin } = require('../../controller/GoogleLogin/authController'); // Adjust the path as necessary

const router = express.Router();

// Route for Google login
router.post('/auth/google-login', googleLogin);

module.exports = router;
