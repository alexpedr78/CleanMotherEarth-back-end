const { Schema, model } = require("mongoose");
// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    photo: {
      type: String,
      default: "default.jpg",
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
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
const User = model("User", userSchema);

module.exports = User;
