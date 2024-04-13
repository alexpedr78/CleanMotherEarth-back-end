const { Schema, model } = require("mongoose");
// TODO: Please make sure you edit the User model to whatever makes sense in this case
const eventSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    userId: String,
    timeStart: Date,
    photo: {
      type: String,
      default: "adventure.jpg",
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
const Event = model("Event", eventSchema);

module.exports = eventSchema;
