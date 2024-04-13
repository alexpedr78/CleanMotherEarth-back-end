const { Schema, model } = require("mongoose");
// TODO: Please make sure you edit the User model to whatever makes sense in this case
const commentSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    userId: String,
    eventId: String,
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);
const Comment = model("Comment", commentSchema);

module.exports = commentSchema;
