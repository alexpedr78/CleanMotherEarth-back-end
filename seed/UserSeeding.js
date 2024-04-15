// Import necessary modules
const mongoose = require("mongoose");
const User = require("../models/User.model"); // Assuming you have a User model defined
const PORT = 5008;

// Connect to MongoDB
mongoose.connect(`mongodb://localhost:27017/practicebackend`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define data to seed
const usersData = [
  {
    pseudo: "helloTestAlexEI",
    name: "AlexEI Doe",
    email: "alexEI@example.com",
    password: "password123",
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
