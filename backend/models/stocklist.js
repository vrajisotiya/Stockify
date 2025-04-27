const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const stocklistSchema = new Schema(
  {
    symbol: String,
    name: String,
    price: Number,
    change: Number,
    changePercent: Number,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Stocklist", stocklistSchema);
