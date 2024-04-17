// Import necessary modules
const mongoose = require("mongoose");
const Joigner = require("../models/IWillCome.model"); // Assuming you have a User model defined
const PORT = 5008;

// Connect to MongoDB
mongoose.connect(`mongodb://localhost:27017/practicebackend`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define data to seed
const joinersData = [
  {
    creator: "661ba103a2b5979d57e0224c",
    eventId: "661e47bb22c10fd5c20db3cf",
  },
];

// Insert data into the collection
Joigner.insertMany(joinersData)
  .then(() => {
    console.log("Data seeding complete");
    mongoose.connection.close(); // Close the MongoDB connection
  })
  .catch((error) => {
    console.error("Error seeding data:", error);
    mongoose.connection.close(); // Close the MongoDB connection
  });
