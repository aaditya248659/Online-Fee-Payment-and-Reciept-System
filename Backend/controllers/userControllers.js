// filepath: Backend/controllers/userControllers.js
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Users = require("../models/Users");
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const { Op } = require('sequelize');

const userControllers = {
    // Register
    createUser: async (req, res) => {
        try {
            const { name, email, password, mobile_no } = req.body;
            const existing = await Users.findOne({ where: { email } });
            if (existing) return res.status(400).json({ message: "User already exists" });

            const hashed = await bcrypt.hash(password, 10);
            const newUser = await Users.create({ name, email, password: hashed, mobile_no });
            res.status(201).json({ message: "User registered", user: newUser });
        } catch (err) {
            console.log("Error", err);
            res.status(500).json({ message: 'Error creating user' });
        }
    },

    // Login
    loginUser: async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await Users.findOne({ where: { email } });
            if (!user) return res.status(400).json({ message: "Invalid credentials" });

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

            const token = jwt.sign({ id: user.id }, 'your_jwt_secret', { expiresIn: '1d' });
            res.json({ token, user_id: user.id }); // <-- This line is important!
        } catch (err) {
            console.log("Error", err);
            res.status(500).json({ message: 'Error logging in' });
        }
    },

    // Admin Login
    adminLogin: async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await Users.findOne({ where: { email } });
            if (!user || !user.isAdmin) {
                return res.status(401).json({ message: "Not authorized as admin" });
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: "Invalid credentials" });
            }
            const token = jwt.sign({ id: user.id, isAdmin: true }, 'your_jwt_secret', { expiresIn: '1d' });
            res.json({ token, isAdmin: true });
        } catch (err) {
            console.log("Admin login error:", err);
            res.status(500).json({ message: "Error logging in as admin" });
        }
    },

    // Forgot Password (with debugging)
    forgotPassword: async (req, res) => {
        try {
            const { email } = req.body;
            console.log('Forgot password request for email:', email);
            
            // Find user by email
            const user = await Users.findOne({ where: { email } });
            console.log('User found:', user ? 'Yes' : 'No');
            
            if (!user) {
                console.log('User not found in database');
                return res.status(404).json({ message: "User with this email does not exist" });
            }

            // Generate reset token
            const resetToken = crypto.randomBytes(32).toString('hex');
            const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour from now

            // Save reset token to user
            user.resetToken = resetToken;
            user.resetTokenExpiry = resetTokenExpiry;
            await user.save();

            console.log('Reset token generated:', resetToken);

            // Use the correct port - 3173 instead of 3000
            res.json({ 
                message: "Password reset request processed successfully",
                resetToken: resetToken,
                resetUrl: `http://localhost:3173/reset-password/${resetToken}`, // Changed to 3173
                note: "In a real application, this would be sent via email."
            });
        } catch (err) {
            console.error("Error in forgot password:", err);
            res.status(500).json({ message: "Error processing reset request" });
        }
    },

    // Reset Password
    resetPassword: async (req, res) => {
        try {
            const { token } = req.params;
            const { newPassword } = req.body;

            // Find user with valid reset token
            const user = await Users.findOne({
                where: {
                    resetToken: token,
                    resetTokenExpiry: {
                        [Op.gt]: new Date() // Token not expired
                    }
                }
            });

            if (!user) {
                return res.status(400).json({ message: "Invalid or expired reset token" });
            }

            // Hash new password
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

            // Update password and clear reset token
            user.password = hashedPassword;
            user.resetToken = null;
            user.resetTokenExpiry = null;
            await user.save();

            res.json({ message: "Password reset successful" });
        } catch (err) {
            console.error("Error in reset password:", err);
            res.status(500).json({ message: "Error resetting password" });
        }
    },

    // Get all users (admin/test)
    getAllUsers: async (req, res) => {
        try {
            const allUsers = await Users.findAll({
                where: { isAdmin: false }, // Only non-admin users
                attributes: { exclude: ['password'] }
            });
            res.status(200).json(allUsers);
        } catch (err) {
            console.log(err);
            res.json({ message: "Error in getAllUsers." });
        }
    },

    // Get user by ID (protected)
    getUserById: async (req, res) => {
        try {
            const { id } = req.params;
            const user = await Users.findByPk(id, { attributes: { exclude: ['password'] } });
            if (!user) return res.json({ message: "User not found" });
            res.json(user);
        } catch (err) {
            console.log(err);
            res.json({ message: "Error in getUserById" });
        }
    },

    // Get current user (protected)
    getCurrentUser: async (req, res) => {
        try {
            const user = await Users.findByPk(req.user.id, { attributes: { exclude: ['password'] } });
            if (!user) return res.status(404).json({ message: "User not found" });

            // If user is admin, remove student-specific fields
            let userData = user.toJSON();
            if (userData.isAdmin) {
                delete userData.feeDue;
                delete userData.dueDate;
                delete userData.roll_no;
                delete userData.course;
                delete userData.semester;
            }

            res.json(userData);
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "Error in getCurrentUser" });
        }
    },

    // Update current user (protected)
    updateCurrentUser: async (req, res) => {
        try {
            const user = await Users.findByPk(req.user.id);
            if (!user) return res.status(404).json({ message: "User not found" });

            // Only update fields that are present in the request body
            const allowedFields = ['mobile_no', 'roll_no', 'course', 'semester', 'feeDue'];
            allowedFields.forEach(field => {
                if (req.body[field] !== undefined) {
                    user[field] = req.body[field];
                }
            });

            await user.save();

            // Exclude password from response
            const { password, ...userData } = user.toJSON();
            res.json(userData);
        } catch (err) {
            console.error("Error updating user:", err);
            res.status(500).json({ message: "Error updating user" });
        }
    },

    // Update student by admin
    updateStudentByAdmin: async (req, res) => {
        try {
            const user = await Users.findByPk(req.params.id);
            if (!user) return res.status(404).json({ message: "User not found" });
            
            const { roll_no, course, semester, feeDue, dueDate, mobile_no, name, email } = req.body;
            
            // Update all fields that are provided
            if (name !== undefined) user.name = name;
            if (email !== undefined) user.email = email;
            if (mobile_no !== undefined) user.mobile_no = mobile_no;
            if (roll_no !== undefined) user.roll_no = roll_no;
            if (course !== undefined) user.course = course;
            if (semester !== undefined) user.semester = semester;
            if (feeDue !== undefined) user.feeDue = feeDue;
            if (dueDate !== undefined) user.dueDate = dueDate;
            
            await user.save();
            
            console.log(`Updated user ${user.id}:`, user.toJSON());
            res.json({ message: "Student updated successfully", user });
        } catch (err) {
            console.error("Error updating student:", err);
            res.status(500).json({ message: "Error updating student", error: err.message });
        }
    },
};

module.exports = userControllers;
