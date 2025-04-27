const Holding = require("../models/holding");
const { StatusCodes } = require("http-status-codes");

module.exports.holding = async (req, res) => {
  try {
    const userid = req.user.id;
    if (!userid) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "All fields is required",
      });
    }

    const holdings = await Holding.find({ owner: userid }).select(
      "name avgprice ltp quantity net -_id"
    );

    if (holdings.length === 0) {
      return res.status(StatusCodes.OK).json({
        message: "No holdings found",
        data: [],
      });
    }

    res.status(StatusCodes.OK).json({
      success: true,
      count: holdings.length,
      data: holdings,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Failed to fetch holdings",
      error: error.message,
    });
  }
};
