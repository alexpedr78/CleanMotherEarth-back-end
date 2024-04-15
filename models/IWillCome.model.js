const { Schema, model } = require("mongoose");
const { schema } = require("./User.model");

const IWillComeSchema = new Schema(
  {
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    eventID: {
      type: Schema.Types.ObjectId,
      ref: "Event",
    },
  },
  {
    timestamps: true,
  }
);

const IWillCome = model("IWillCome", IWillComeSchema);

module.exports = IWillCome;
