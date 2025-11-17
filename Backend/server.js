// Backend/server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
// const { sequelize, connectDb } = require('./config/db'); // remove Sequelize import
const connectDb = require('./config/db');  // new Mongo connection

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// your routes, middleware etc
app.use('/api/users', require('./routes/userRoutes'));
// etc.

const startServer = async () => {
  try {
    await connectDb();          // connect MongoDB
    // await sequelize.sync();   // remove this
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Startup error:', error);
    process.exit(1);
  }
};

startServer();
