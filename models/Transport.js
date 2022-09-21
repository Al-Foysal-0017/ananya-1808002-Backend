const { model, Schema } = require("mongoose");

const transportSchema = new Schema(
  {
    source: {
      type: String,
      required: true,
    },
    destination: {
      type: String,
      required: true,
    },
    transport: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = model("transport", transportSchema);
