// routes/userRoutes.js
const express = require('express');
const { getUserById, updateUser } = require('../../controller/UserController/userController');
const router = express.Router();

// Get user by ID
router.get('/users/:id', getUserById);

// Update user
router.put('/users/:id', updateUser);

module.exports = router;
