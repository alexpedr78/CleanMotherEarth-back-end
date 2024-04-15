const { Schema, model } = require("mongoose");
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    pseudo: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      select: false,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false,
    },
    // photo: {
    //   type: String,
    //   default: "default.jpg",
    // },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
      // select: false,
    },
    // location: {
    //   type: { type: String },
    //   coordinates: [Number],
    // },
  },
  {
    timestamps: true,
  }
);
const User = model("User", userSchema);

module.exports = User;
