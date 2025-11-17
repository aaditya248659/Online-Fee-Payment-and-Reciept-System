require("dotenv").config();
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: "mysql",
        logging: false
    }
); 

const connectDb = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connected to Railway MySQL using Sequelize!");
  } catch (error) {
    console.error("Database connection failed:", error.message);
  }
};

module.exports = { sequelize, connectDb };
