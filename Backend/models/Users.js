// Backend/models/Users.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },

    email: { type: String, required: true, unique: true },

    password: { type: String, required: true },

    mobile_no: { type: String, required: true, unique: true },

    feeDue: { type: Number, default: 0 },

    dueDate: { type: String, default: "0" },

    roll_no: { type: String, unique: false },

    course: { type: String },

    semester: { type: Number },

    isAdmin: { type: Boolean, default: false },

    resetToken: { type: String },

    resetTokenExpiry: { type: Date }
}, {
    timestamps: false
});

module.exports = mongoose.model("Users", UserSchema);
