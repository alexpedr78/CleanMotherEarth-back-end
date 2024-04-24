const mongoose = require("mongoose");
const Event = require("../models/Event.model.js");
require("./../db/index");

const eventsData = [
  {
    name: "cleaning day",
    creator: "66212e4b171c5b7b4dc2a2e2",
    description: "hehehe",
    position: { lat: Number(487823233), long: Number(1.9637699) },
  },
];

Event.insertMany(eventsData)
  .then(() => {
    console.log("Data seeding complete");
    mongoose.connection.close();
  })
  .catch((error) => {
    console.error("Error seeding data:", error);
    mongoose.connection.close();
  });
