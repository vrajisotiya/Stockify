const usercontroller = require("../controllers/authcontroller");
const router = require("express").Router();
const wrapAsync = require("../utils/wrapAsync.js");

router.post("/check-auth", usercontroller.getuser);
router.post("/signup", wrapAsync(usercontroller.Signup));
router.post("/login", wrapAsync(usercontroller.Login));
router.post("/verify-email", usercontroller.VerifyEmail);
router.post("/forgot-password", usercontroller.ForgotPassword);
router.post("/reset-password/:token", usercontroller.ResetPassword);
router.get("/validate-resettoken/:token", usercontroller.ResetPasswordToken);
router.post("/logout", wrapAsync(usercontroller.Logout));

module.exports = router;
