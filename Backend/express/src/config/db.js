const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("feepay", "root", "root", {
    host: "localhost",
    dialect: "mysql"
});

const connectDb = async () => {
    try {
        await sequelize.authenticate();
        console.log("Connected to MySQL database");
    } catch (err) {
        console.log("DB connection error:", err);
    }
};

module.exports = { sequelize, connectDb };