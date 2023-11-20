
// Import the required modules
const express = require('express');

// Import the mongoose module
const mongoose = require('mongoose');

//Import the dotenv module
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

// Create an instance of the Express server
const app = express();

// Define a route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
