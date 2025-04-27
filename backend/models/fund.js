const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const fundSchema = new Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    totalblance: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Fund", fundSchema);
