const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { sequelize } = require("./config/db");

// Routes
const userRoutes = require("./routes/userRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Default route
app.get("/", (req, res) => {
  res.send("FeePay backend is running.");
});

// API routes
app.use("/api/users", userRoutes);

// Start server after DB connect
async function startServer() {
  try {
    await sequelize.authenticate();
    console.log("Connected to Railway MySQL!");

    await sequelize.sync();
    console.log("Database synced.");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Startup Error:", error);
  }
}

startServer();
