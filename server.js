
// Import the required modules
const express = require('express');

// Import the mongoose module
const mongoose = require('mongoose');

//Import the dotenv module
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

//import app.js
const app = require('./app');



// Start the server
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
