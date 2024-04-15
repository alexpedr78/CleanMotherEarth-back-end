// Import necessary modules
const mongoose = require("mongoose");
const GarbagePlace = require("../models/GarbagePlace.model.js");

// Connect to MongoDB
mongoose.connect(`mongodb://localhost:27017/practicebackend`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define data to seed
const garbagePlaceData = [
  {
    name: "Forest",
    creator: "661ba103a2b5979d57e0224c",
  },
];

// Insert data into the collection
GarbagePlace.insertMany(garbagePlaceData)
  .then(() => {
    console.log("Data seeding complete");
    mongoose.connection.close(); // Close the MongoDB connection
  })
  .catch((error) => {
    console.error("Error seeding data:", error);
    mongoose.connection.close(); // Close the MongoDB connection
  });
