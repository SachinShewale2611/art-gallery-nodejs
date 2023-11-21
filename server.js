// Import the required modules
const express = require("express");

// Import the mongoose module
const mongoose = require("mongoose");

//Import the dotenv module
const dotenv = require("dotenv");

dotenv.config({ path: "./.env" });

//import app.js
const app = require("./app");

// Connect to the database
const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);
mongoose.connect(DB).then(() => console.log("DB connection successful!"));

// Start the server
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
