const { Schema, model } = require("mongoose");
// TODO: Please make sure you edit the User model to whatever makes sense in this case
const garbagePlaceSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    userId: String,
    photo: {
      type: String,
      default: "plasticBag.jpg",
    },
    location: {
      type: { type: String },
      coordinates: [Number],
    },
  },
  {
    timestamps: true,
  }
);
const GarbagePlace = model("GarbagePlace", garbagePlaceSchema);

module.exports = garbagePlaceSchema;
