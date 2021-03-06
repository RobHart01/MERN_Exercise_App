// Requirements
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// Configuration
require('dotenv').config();

// Create express server
const app = express();
const port = process.env.PORT || 5000;

// Middleware
// Parse JSON
app.use(cors());
app.use(express.json());

// Database
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB: Database connection established dawg");
})

// Declaring routes
const exercisesRouter = require("./Routes/exercises");
const usersRouter = require("./Routes/users");

// Using the routes
app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

// Listening to server
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});