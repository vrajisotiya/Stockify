const mongoose = require("mongoose");
const Order = require("../models/order");
const Stocklist = require("../models/stocklist");
const Holding = require("../models/holding");
const Fund = require("../models/fund");

module.exports = async () => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const pendingOrders = await Order.find({ status: "pending" });

    for (let order of pendingOrders) {
      const stock = await Stocklist.findOne({ symbol: order.name });
      if (!stock) continue;

      const currentPrice = stock.price;

      if (currentPrice === order.price) {
        const userfunds = await Fund.findOne({ owner: order.owner }).session(
          session
        );
        const holding = await Holding.findOne({
          owner: order.owner,
          name: order.name,
        }).session(session);
        const totalAmount = order.price * order.quantity;

        if (order.mode === "buy") {
          if (userfunds.totalblance >= totalAmount) {
            if (holding) {
              const newTotal =
                holding.avgprice * holding.quantity + totalAmount;
              holding.quantity += order.quantity;
              holding.avgprice = newTotal / holding.quantity;
              holding.ltp = order.price;
              holding.net =
                ((holding.ltp - holding.avgprice) / holding.avgprice) * 100;
              await holding.save({ session });
            } else {
              const newHolding = new Holding({
                owner: order.owner,
                name: order.name,
                avgprice: order.price,
                ltp: order.price,
                quantity: order.quantity,
                net: 0,
              });
              await newHolding.save({ session });
            }

            userfunds.totalblance -= totalAmount;
            await userfunds.save({ session });

            order.status = "complete";
            await order.save({ session });
          }
        } else if (order.mode === "sell") {
          if (holding && holding.quantity >= order.quantity) {
            holding.quantity -= order.quantity;
            holding.ltp = order.price;
            holding.net =
              ((holding.ltp - holding.avgprice) / holding.avgprice) * 100;

            if (holding.quantity === 0) {
              await Holding.deleteOne({ _id: holding._id }).session(session);
            } else {
              await holding.save({ session });
            }

            userfunds.totalblance += totalAmount;
            await userfunds.save({ session });

            order.status = "complete";
            await order.save({ session });
          }
        }
      }
    }

    await session.commitTransaction();
    console.log("Pending orders processed");
  } catch (err) {
    await session.abortTransaction();
    console.error(" Pending orders processed failed:", err.message);
  } finally {
    session.endSession();
  }
};
