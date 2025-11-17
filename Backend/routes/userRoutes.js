// Backend/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/userControllers');
const auth = require('../middleware/auth');

// Registration
router.post('/register', userControllers.createUser);

// Login 
router.post('/login', userControllers.loginUser);

// Admin Login
router.post('/admin-login', userControllers.adminLogin);

// Forgot password
router.post('/forgot-password', userControllers.forgotPassword);

// Reset password
router.post('/reset-password/:token', userControllers.resetPassword);

// Get all users
router.get('/all', userControllers.getAllUsers);

// Get current user
router.get('/me', auth, userControllers.getCurrentUser);

// Update current user
router.put('/me', auth, userControllers.updateCurrentUser);

// Admin update user
router.put('/:id', auth, userControllers.updateStudentByAdmin);

module.exports = router;
