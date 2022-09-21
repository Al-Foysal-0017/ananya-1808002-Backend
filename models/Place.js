const { model, Schema } = require("mongoose");

const placeSchema = new Schema(
  {
    place: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = model("place", placeSchema);
