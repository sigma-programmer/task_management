const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authentication');

// Dashboard route
router.get('/intaskr/page/pageauth', authMiddleware, (req, res) => {
  const { _id, role, uniqueToken } = req.user; // Extracting _id, role, and username from the user object

  res.json({ UserId: _id, Role: role, uniqueToken: uniqueToken }); // Returning user ID, role, and username in the response
});

module.exports = router;
