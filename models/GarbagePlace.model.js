const { Schema, model } = require("mongoose");
const garbagePlaceSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    userId: { type: Schema.Types.ObjectId, Ref: "User" },
    // photo: {
    //   // required: false,
    //   type: String,
    //   default: "plasticBag.jpg",
    // },
    // location: {
    //   // required: false,
    //   type: { type: String },
    //   coordinates: [Number],
    // },
  },
  {
    timestamps: true,
  }
);

const GarbagePlace = model("GarbagePlace", garbagePlaceSchema);

module.exports = GarbagePlace;
