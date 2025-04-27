const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const orderSchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    name: {
      type: String,
    },
    mode: {
      type: String,
      enum: ["buy", "sell"],
    },
    price: {
      type: Number,
    },
    quantity: {
      type: Number,
    },
    status: {
      type: String,
      enum: ["pending", "complete"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
