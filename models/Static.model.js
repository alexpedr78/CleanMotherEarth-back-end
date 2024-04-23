const { Schema, model } = require("mongoose");

const StaticSchema = new Schema(
  {
    name: {
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

const Static = model("Static", StaticSchema);

module.exports = Static;
