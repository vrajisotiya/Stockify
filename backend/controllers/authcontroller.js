const User = require("../models/user");
const { createSecretToken } = require("../utils/secerattoken");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const validator = require("validator");
const { StatusCodes, getReasonPhrase } = require("http-status-codes");
const {
  sendVerificationEmail,
  sendPasswordResetEmail,
  sendPasswordResetSuccessEmail,
} = require("../service/emailservice");

module.exports.Signup = async (req, res) => {
  const { email, password, username } = req.body;

  if (!username || !password || !email) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "All fields are required", success: false });
  }
  if (!validator.isEmail(email)) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Invalid email", success: false });
  }
  if (!validator.isStrongPassword(password)) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Password is not strong enough", success: false });
  }
  const existingUser = await User.findOne({ $or: [{ email }, { username }] });
  if (existingUser) {
    return res.json({
      message: "username or email already exists",
      success: false,
    });
  }
  const verificationToken = Math.floor(
    100000 + Math.random() * 900000
  ).toString();

  const user = await User.create({
    email,
    username,
    password,
    verificationToken,
    verificationExpire: Date.now() + 15 * 60 * 1000,
  });

  const token = createSecretToken(user._id);

  res.cookie("token", token, {
    httpOnly: true,
    maxAge: 3 * 24 * 60 * 60 * 1000,
  });

  await sendVerificationEmail(user.email, user.username, verificationToken);

  res.status(StatusCodes.CREATED).json({
    message: "User signed in successfully",
    success: true,
    user: {
      username: user.username,
      isVerified: user.isVerified,
    },
  });
};

module.exports.Login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "All fields are required", success: false });
  }
  const user = await User.findOne({ username });
  if (!user) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Incorrect  username", success: false });
  }
  const auth = await bcrypt.compare(password, user.password);

  if (!auth) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Incorrect password ", success: false });
  }
  const token = createSecretToken(user._id);
  res.cookie("token", token, {
    httpOnly: true,
    maxAge: 3 * 24 * 60 * 60 * 1000,
  });
  res.status(StatusCodes.OK).json({
    message: "User logged in successfully",
    success: true,
    user: {
      username: user.username,
      isVerified: user.isVerified,
    },
  });
};

module.exports.Logout = async (req, res, next) => {
  res.clearCookie("token", {
    httpOnly: true,
  });
  res
    .status(StatusCodes.OK)
    .json({ success: true, message: "Logged out successfully" });
};

module.exports.getuser = (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ status: false, success: false });
  }
  jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
    if (err) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        message: getReasonPhrase(StatusCodes.UNAUTHORIZED),
        success: false,
      });
    } else {
      const user = await User.findById(data.id).select(
        "username  isVerified -_id"
      );
      if (user)
        return res.status(StatusCodes.OK).json({
          user: user,
          success: true,
        });
      else
        return res.status(StatusCodes.UNAUTHORIZED).json({
          success: false,
          message: getReasonPhrase(StatusCodes.UNAUTHORIZED),
        });
    }
  });
};

module.exports.VerifyEmail = async (req, res) => {
  const { code } = req.body;
  try {
    const user = await User.findOne({
      verificationToken: code,
      verificationExpire: { $gt: Date.now() },
    });
    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: "Verification code is invalid or expired",
        success: false,
      });
    }
    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationExpire = undefined;
    await user.save();
    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Email verified successfully",
      user: user.username,
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Failed to verify email",
      error: error.message,
    });
  }
};

module.exports.ForgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ success: false, message: "User not found" });
    }
    const restToken = crypto.randomBytes(20).toString("hex");
    const restTokenExpire = Date.now() + 60 * 60 * 1000;
    user.restPasswordToken = restToken;
    user.restPasswordExpire = restTokenExpire;
    await user.save();
    await sendPasswordResetEmail(
      user.email,
      user.username,
      `${process.env.CLIENT_URL}/reset-password/${restToken}`
    );
    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Password reset link sent to your email",
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Failed to send password reset link",
      error: error.message,
    });
  }
};

module.exports.ResetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  try {
    const user = await User.findOne({
      restPasswordToken: token,
      restPasswordExpire: { $gt: Date.now() },
    });
    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ success: false, message: "Reset token is invalid or expired" });
    }
    if (!validator.isStrongPassword(password)) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ success: false, message: "Password is not strong enough" });
    }
    user.password = password;
    user.restPasswordToken = undefined;
    user.restPasswordExpire = undefined;
    await user.save();
    await sendPasswordResetSuccessEmail(user.email, user.username);
    return res
      .status(StatusCodes.OK)
      .json({ success: true, message: "Password reset successfully" });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Failed to reset password",
      error: error.message,
    });
  }
};

module.exports.ResetPasswordToken = async (req, res) => {
  const { token } = req.params;
  try {
    const user = await User.findOne({
      restPasswordToken: token,
      restPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ success: false, message: "Reset token is invalid or expired" });
    }

    return res
      .status(StatusCodes.OK)
      .json({ success: true, message: "Token is valid" });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Failed to validate reset token",
      error: error.message,
    });
  }
};
