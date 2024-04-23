const { Schema, model } = require("mongoose");

const StaticSchema = new Schema(
  {
    name: {
      type: String,
    },
    eventId: {
      type: String,
    },
    description: {
      type: String,
    },
    photo: {
      type: string,
    },
  },
  {
    timestamps: true,
  }
);

const Comment = model("Comment", commentSchema);

module.exports = Comment;
