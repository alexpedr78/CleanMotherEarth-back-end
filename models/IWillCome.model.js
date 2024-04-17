const { Schema, model } = require("mongoose");
const { schema } = require("./User.model");

const IWillComeSchema = new Schema(
  {
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    eventId: {
      type: Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const IWillCome = model("IWillCome", IWillComeSchema);

module.exports = IWillCome;
