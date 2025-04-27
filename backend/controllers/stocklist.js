const Stocklist = require("../models/stocklist");
const { StatusCodes } = require("http-status-codes");

module.exports.stocklist = async (req, res) => {
  try {
    const stocklist = await Stocklist.find({}).select(
      "symbol name change changePercent price -_id"
    );
    if (!stocklist.length) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        data: [],
        message: "No stocklist found.",
      });
    }
    return res.status(StatusCodes.OK).json({
      success: true,
      data: stocklist,
    });
  } catch (error) {
    console.error("Stocklist fetch error:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Failed to fetch stocklist. Please try again later.",
    });
  }
};
