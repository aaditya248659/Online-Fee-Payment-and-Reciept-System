// filepath: Backend/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/userControllers');
const auth = require('../middleware/auth');
const { sequelize } = require("../config/db");
const { DataTypes } = require("sequelize");

// Registration
router.post('/register', userControllers.createUser);

// Login 
router.post('/login', userControllers.loginUser);

// Admin Login
router.post('/admin-login', userControllers.adminLogin);

// Forgot password (mock)
router.post('/forgot-password', userControllers.forgotPassword);

// Reset password
router.post('/reset-password/:token', userControllers.resetPassword);

// Get all users (for admin/testing)
router.get('/all', userControllers.getAllUsers);

// Get user by ID (protected)
router.get('/me', auth, userControllers.getCurrentUser);

// Update user (protected)
router.put('/me', auth, userControllers.updateCurrentUser);

// Update user by admin
router.put('/:id', auth, userControllers.updateStudentByAdmin);

module.exports = router;