const { Schema, model } = require("mongoose");

const eventSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    timeStart: {
      type: Date,
      // required: true,
    },
    photo: {
      type: String,
      default: "adventure.jpg",
    },
    description: {
      type: String,
      required: true,
    },
    position: {
      long: {
        type: Number,
        required: true,
      },
      lat: {
        type: Number,
        required: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

const Event = model("Event", eventSchema);

module.exports = Event;
