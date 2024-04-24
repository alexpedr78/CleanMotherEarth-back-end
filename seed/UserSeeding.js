const mongoose = require("mongoose");
const User = require("../models/User.model");
const bcrypt = require("bcryptjs");
require("./../db/index");

const safePassword = bcrypt.hashSync("password123", 12);
const usersData = [
  {
    pseudo: "test",
    name: "AlexEI Doe",
    email: "alexEI@example.com",
    password: safePassword,
  },
];

User.insertMany(usersData)
  .then(() => {
    console.log("Data seeding complete");
    mongoose.connection.close();
  })
  .catch((error) => {
    console.error("Error seeding data:", error);
    mongoose.connection.close();
  });
