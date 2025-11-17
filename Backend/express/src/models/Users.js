const { sequelize } = require("../config/db");
const { DataTypes } = require("sequelize");

const Users = sequelize.define('Users', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    mobile_no: { type: DataTypes.STRING, allowNull: false, unique: true },
    feeDue: { type: DataTypes.INTEGER, allowNull: true, defaultValue: 0 }, // Allow NULL temporarily
    dueDate: { type: DataTypes.STRING, allowNull: true, defaultValue: '0' }, // Allow NULL temporarily
    roll_no: { type: DataTypes.STRING, unique: true, allowNull: true },
    course: { type: DataTypes.STRING, allowNull: true },
    semester: { type: DataTypes.INTEGER, allowNull: true },
    isAdmin: { type: DataTypes.BOOLEAN, defaultValue: false },
    resetToken: { type: DataTypes.STRING, allowNull: true }, // Add this
    resetTokenExpiry: { type: DataTypes.DATE, allowNull: true } // Add this
}, {
    timestamps: false
});

module.exports = Users;