require("dotenv").config();
const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");

module.exports = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ success: false, message: "Unauthorized: No token provided" });
  }
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    req.user = { id: decoded.id };
    next();
  } catch (error) {
    console.log(error);

    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ success: false, message: "Unauthorized: Invalid token" });
  }
};
