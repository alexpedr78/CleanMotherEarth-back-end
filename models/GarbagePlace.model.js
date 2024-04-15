const { Schema, model } = require("mongoose");
const garbagePlaceSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    creator: { type: Schema.Types.ObjectId, Ref: "User" },
    // photo: {
    //   required: true,
    //   type: String,
    //   default: "plasticBag.jpg",
    // },
    location: {
      // required: true,
      long: { type: String },
      lat: { type: String },
    },
    description: {
      required: true,
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const GarbagePlace = model("GarbagePlace", garbagePlaceSchema);

module.exports = GarbagePlace;
