// Backend/controllers/userControllers.js
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Users = require("../models/Users");
const nodemailer = require('nodemailer');
const crypto = require('crypto');

const userControllers = {

    // REGISTER
    createUser: async (req, res) => {
        try {
            const { name, email, password, mobile_no } = req.body;

            const existing = await Users.findOne({ email });
            if (existing) return res.status(400).json({ message: "User already exists" });

            const hashed = await bcrypt.hash(password, 10);

            const newUser = await Users.create({
                name, email, password: hashed, mobile_no
            });

            res.status(201).json({ message: "User registered", user: newUser });
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: 'Error creating user' });
        }
    },

    // LOGIN
    loginUser: async (req, res) => {
        try {
            const { email, password } = req.body;

            const user = await Users.findOne({ email });
            if (!user) return res.status(400).json({ message: "Invalid credentials" });

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

            const token = jwt.sign({ id: user._id }, 'your_jwt_secret', { expiresIn: '1d' });

            res.json({ token, user_id: user._id });
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "Error logging in" });
        }
    },

    // ADMIN LOGIN
    adminLogin: async (req, res) => {
        try {
            const { email, password } = req.body;

            const user = await Users.findOne({ email });
            if (!user || !user.isAdmin)
                return res.status(401).json({ message: "Not authorized as admin" });

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

            const token = jwt.sign({ id: user._id, isAdmin: true }, 'your_jwt_secret', { expiresIn: '1d' });

            res.json({ token, isAdmin: true });
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "Error logging in admin" });
        }
    },

    // FORGOT PASSWORD
    forgotPassword: async (req, res) => {
        try {
            const { email } = req.body;

            const user = await Users.findOne({ email });
            if (!user) return res.status(404).json({ message: "Email not registered" });

            const resetToken = crypto.randomBytes(32).toString("hex");
            const expiry = Date.now() + 3600000;

            user.resetToken = resetToken;
            user.resetTokenExpiry = expiry;

            await user.save();

            res.json({
                message: "Reset token generated",
                resetToken,
                resetUrl: `http://localhost:3173/reset-password/${resetToken}`
            });

        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "Error in forgot password" });
        }
    },

    // RESET PASSWORD
    resetPassword: async (req, res) => {
        try {
            const { token } = req.params;
            const { newPassword } = req.body;

            const user = await Users.findOne({
                resetToken: token,
                resetTokenExpiry: { $gt: Date.now() }
            });

            if (!user)
                return res.status(400).json({ message: "Invalid or expired token" });

            const hashed = await bcrypt.hash(newPassword, 10);

            user.password = hashed;
            user.resetToken = null;
            user.resetTokenExpiry = null;

            await user.save();

            res.json({ message: "Password reset successful" });
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: "Error resetting password" });
        }
    },

    // ALL USERS
    getAllUsers: async (req, res) => {
        try {
            const users = await Users.find({ isAdmin: false }).select("-password");
            res.json(users);
        } catch (err) {
            res.status(500).json({ message: "Error fetching users" });
        }
    },

    // ME
    getCurrentUser: async (req, res) => {
        try {
            const user = await Users.findById(req.user.id).select("-password");
            res.json(user);
        } catch (err) {
            res.status(500).json({ message: "Error fetching user" });
        }
    },

    // UPDATE PROFILE
    updateCurrentUser: async (req, res) => {
        try {
            const updates = req.body;
            const user = await Users.findByIdAndUpdate(req.user.id, updates, { new: true });
            res.json(user);
        } catch (err) {
            res.status(500).json({ message: "Error updating user" });
        }
    },

    // ADMIN UPDATE USER
    updateStudentByAdmin: async (req, res) => {
        try {
            const updates = req.body;
            const user = await Users.findByIdAndUpdate(req.params.id, updates, { new: true });

            res.json({ message: "Student updated", user });
        } catch (err) {
            res.status(500).json({ message: "Error updating student" });
        }
    }
};

module.exports = userControllers;
