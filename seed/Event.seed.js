// Import necessary modules
const mongoose = require("mongoose");
const Event = require("../models/Event.model.js"); // Assuming you have a User model defined
const PORT = 5008;
require("./../db/index");

// Define data to seed
const eventsData = [
  {
    name: "big cleaning and dancing naked party",
    creator: "66212e4b171c5b7b4dc2a2e2",
    description: "hehehe",
  },
];

// Insert data into the collection
Event.insertMany(eventsData)
  .then(() => {
    console.log("Data seeding complete");
    mongoose.connection.close(); // Close the MongoDB connection
  })
  .catch((error) => {
    console.error("Error seeding data:", error);
    mongoose.connection.close(); // Close the MongoDB connection
  });
