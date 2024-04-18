// Import necessary modules
const mongoose = require("mongoose");
const User = require("../models/User.model"); // Assuming you have a User model defined
const PORT = 5008;
const bcrypt = require("bcryptjs");
require("./../db/index");

// Define data to seed
const safePassword = bcrypt.hashSync("password123", 12);
const usersData = [
  {
    pseudo: "test",
    name: "AlexEI Doe",
    email: "alexEI@example.com",
    password: safePassword,
  },
];

// Insert data into the collection
User.insertMany(usersData)
  .then(() => {
    console.log("Data seeding complete");
    mongoose.connection.close(); // Close the MongoDB connection
  })
  .catch((error) => {
    console.error("Error seeding data:", error);
    mongoose.connection.close(); // Close the MongoDB connection
  });
