const Order = require("../models/order");
const Fund = require("../models/fund");
const Holding = require("../models/holding");
const Stocklist = require("../models/stocklist");
const mongoose = require("mongoose");
const { StatusCodes } = require("http-status-codes");

module.exports.buy = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const userid = req.user.id;
    const { name, price, quantity } = req.body;
    if (!userid || !name || !price || !quantity) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ success: false, message: "All fields are required" });
    }

    const stock = await Stocklist.findOne({ symbol: name });
    if (!stock) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ success: false, message: "Stock not found" });
    }
    const currentprice = stock.price;
    const userfunds = await Fund.findOne({ owner: userid }).session(session);
    if (!userfunds) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ success: false, message: "User funds not found" });
    }

    const totalcost = price * quantity;
    if (userfunds.totalblance < totalcost) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ success: false, message: "Insufficient funds" });
    }
    if (price === currentprice) {
      const order = new Order({
        owner: userid,
        name,
        price,
        quantity,
        status: "complete",
        mode: "buy",
      });
      await order.save({ session });

      const holding = await Holding.findOne({ owner: userid, name }).session(
        session
      );
      if (holding) {
        const newtotalcost = holding.avgprice * holding.quantity + totalcost;
        holding.quantity += quantity;
        holding.avgprice = newtotalcost / holding.quantity;
        holding.ltp = price;
        holding.net =
          ((holding.ltp - holding.avgprice) / holding.avgprice) * 100;
        await holding.save({ session });
      } else {
        const newHolding = new Holding({
          owner: userid,
          name,
          avgprice: price,
          ltp: price,
          quantity,
          net: 0,
        });
        await newHolding.save({ session });
      }

      userfunds.totalblance -= totalcost;
      await userfunds.save({ session });

      await session.commitTransaction();
      res
        .status(StatusCodes.OK)
        .json({ success: true, message: "Order executed successfully" });
    } else {
      const pendingorder = new Order({
        owner: userid,
        name,
        price,
        quantity,
        status: "pending",
        mode: "buy",
      });
      await pendingorder.save({ session });

      await session.commitTransaction();
      res
        .status(StatusCodes.OK)
        .json({ success: true, message: "Order placed as pending" });
    }
  } catch (error) {
    await session.abortTransaction();
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Transaction failed",
      error: error.message,
    });
  } finally {
    session.endSession();
  }
};

module.exports.sell = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const userid = req.user.id;
    const { name, price, quantity } = req.body;
    if (!userid || !name || !price || !quantity) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ success: false, message: "All fields are required" });
    }

    const holding = await Holding.findOne({ owner: userid, name }).session(
      session
    );
    if (!holding || holding.quantity < quantity) {
      return res
        .status(StatusCodes.FORBIDDEN)
        .json({ success: false, message: "Insufficient holdings to sell" });
    }
    const stock = await Stocklist.findOne({ symbol: name });

    if (!stock) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ success: false, message: "Stock not found" });
    }

    const currentprice = stock.price;

    if (price === currentprice) {
      const order = new Order({
        owner: userid,
        name,
        price,
        quantity,
        status: "complete",
        mode: "sell",
      });
      await order.save({ session });

      const saleamount = price * quantity;

      holding.quantity -= quantity;
      holding.ltp = price;
      holding.net = ((holding.ltp - holding.avgprice) / holding.avgprice) * 100;

      if (holding.quantity === 0) {
        await Holding.deleteOne({ _id: holding._id }).session(session);
      } else {
        await holding.save({ session });
      }

      const userfunds = await Fund.findOne({ owner: userid }).session(session);
      userfunds.totalblance += saleamount;
      await userfunds.save({ session });

      await session.commitTransaction();
      res
        .status(StatusCodes.OK)
        .json({ success: true, message: "Sell order executed successfully" });
    } else {
      const pendingorder = new Order({
        owner: userid,
        name,
        price,
        quantity,
        status: "pending",
        mode: "sell",
      });
      await pendingorder.save({ session });

      await session.commitTransaction();
      res
        .status(StatusCodes.OK)
        .json({ success: true, message: "Sell order placed as pending " });
    }
  } catch (error) {
    await session.abortTransaction();
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Transaction failed",
      error: error.message,
    });
  } finally {
    session.endSession();
  }
};

module.exports.orders = async (req, res) => {
  try {
    const userid = req.user.id;
    if (!userid) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "User id is required.",
      });
    }

    const orders = await Order.find({ owner: userid })
      .select("name price quantity status mode createdAt -_id")
      .lean();

    if (!orders.length) {
      return res.status(StatusCodes.NOT_FOUND).json({
        data: [],
        message: "No orders found .",
      });
    }

    return res.status(StatusCodes.OK).json({
      data: orders,
    });
  } catch (error) {
    console.error("Order fetch error:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Failed to fetch orders. Please try again later.",
    });
  }
};
