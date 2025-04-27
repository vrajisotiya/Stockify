const Fund = require("../models/fund");
const mongoose = require("mongoose");
const { StatusCodes } = require("http-status-codes");

module.exports.fund = async (req, res) => {
  try {
    const userid = req.user.id;
    if (!userid) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "All fields is required" });
    }

    const fund = await Fund.findOne({ owner: userid }).select("totalblance");

    if (!fund) {
      const newfund = new Fund({
        owner: userid,
        totalblance: 0,
      });
      await newfund.save();
      return res.status(StatusCodes.OK).json({
        data: { totalBalance: newfund.totalblance },
      });
    }

    res.status(StatusCodes.OK).json({
      success: true,
      data: { totalBalance: fund.totalblance },
    });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: "Failed to fetch funds" });
  }
};

module.exports.depositfund = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const userid = req.user.id;
    const { amount } = req.body;

    if (!userid || !amount) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "All fields is required" });
    }

    // if (amount <= 0) {
    //     return res.status(StatusCodes.BAD_REQUEST).json({ message: "Amount must be positive" });

    // }

    let fund = await Fund.findOne({ owner: userid }).session(session);

    if (!fund) {
      fund = new Fund({
        owner: userid,
        totalblance: amount,
      });
    } else {
      fund.totalblance += amount;
    }

    await fund.save({ session });
    await session.commitTransaction();

    res.status(StatusCodes.OK).json({
      success: true,
      data: { totalBalance: fund.totalblance },
    });
  } catch (error) {
    await session.abortTransaction();
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: "Failed to deposit funds" });
  } finally {
    session.endSession();
  }
};

module.exports.withdrawfund = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const userid = req.user.id;
    const { amount } = req.body;

    if (!userid || !amount) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "All fields is required" });
    }

    // if (amount <= 0) {
    //   return handleError(res, StatusCodes.BAD_REQUEST, "Amount must be positive");
    // }

    const fund = await Fund.findOne({ owner: userid }).session(session);

    if (!fund) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Fund account not found" });
    }

    if (fund.totalblance < amount) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Insufficient funds" });
    }

    fund.totalblance -= amount;
    await fund.save({ session });
    await session.commitTransaction();

    res.status(StatusCodes.OK).json({
      success: true,
      data: { totalBalance: fund.totalblance },
    });
  } catch (error) {
    await session.abortTransaction();
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: "Failed to withdraw funds" });
  } finally {
    session.endSession();
  }
};
