const mongoose = require("mongoose");
const Joigner = require("../models/IWillCome.model");
const PORT = 5008;
require("./../db/index");
const joinersData = [
  {
    creator: "66212e4b171c5b7b4dc2a2e2",
    eventId: "662131337e9937ee35c0f27a",
  },
];

Joigner.insertMany(joinersData)
  .then(() => {
    console.log("Data seeding complete");
    mongoose.connection.close();
  })
  .catch((error) => {
    console.error("Error seeding data:", error);
    mongoose.connection.close();
  });
