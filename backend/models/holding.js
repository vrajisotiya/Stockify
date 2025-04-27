const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const holdingSchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    name: {
      type: String,
    },
    avgprice: {
      type: Number,
    },
    // ltp = last trade price
    ltp: {
      type: Number,
    },
    quantity: {
      type: Number,
      required: true,
    },
    // Net Change is the percentage difference between the current market price (LTP) and the average cost of the stock (Avg. Price),
    net: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Holding", holdingSchema);
