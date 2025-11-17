// filepath: Backend/index.js
const express = require("express");
const cors = require("cors");
const { sequelize } = require('./config/db');

// Import routes
const userRoutes = require("./routes/userRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
    res.send("Welcome to FeePay backend.");
});

app.use('/api/users', userRoutes);

// Database connection and server start
sequelize.sync().then(() => {
    console.log('Database synced successfully');
    
    // THIS PART IS CRUCIAL - Start the server
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}).catch(err => {
    console.error('Error syncing database:', err);
});
