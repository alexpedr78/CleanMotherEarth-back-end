// Import necessary modules
const mongoose = require("mongoose");
const Event = require("../models/Event.model.js"); // Assuming you have a User model defined
const PORT = 5008;

// Connect to MongoDB
mongoose.connect(`mongodb://localhost:27017/practicebackend`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define data to seed
const eventsData = [
  {
    name: "big cleaning and dancing naked party",
    creator: "661ba103a2b5979d57e0224c",
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
