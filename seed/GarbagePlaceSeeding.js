// Import necessary modules
const mongoose = require("mongoose");
const GarbagePlace = require("../models/GarbagePlace.model.js");
require("./../db/index");

const garbagePlaceData = [
  {
    name: "caca",
    creator: "661ba103a2b5979d57e0224c",
    description: "olala",
    position: { lat: Number(48.9820233), long: Number(1.9734699) },
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
