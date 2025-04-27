require("dotenv").config();
const nodemailer = require("nodemailer");
const {
  VERIFICATION_EMAIL_TEMPLATE,
  PASSWORD_RESET_EMAIL_TEMPLATE,
  PASSWORD_RESET_SUCCESS_EMAIL_TEMPLATE,
} = require("./emailtemplete");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendVerificationEmail = async (email, name, verificationToken) => {
  const htmlContent = VERIFICATION_EMAIL_TEMPLATE.replace(
    "{name}",
    name
  ).replace("{verificationCode}", verificationToken);

  const mailOptions = {
    from: `"Stockify" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: `${verificationToken} is your Verification Code`,
    html: htmlContent,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    //console.log("Verification email sent:", info.response);
  } catch (error) {
    console.error("Error sending verification email:", error);
  }
};

const sendPasswordResetEmail = async (email, name, resturl) => {
  const htmlContent = PASSWORD_RESET_EMAIL_TEMPLATE.replace(
    "{name}",
    name
  ).replaceAll("{resetLink}", resturl);
  const mailOptions = {
    from: `"Stockify" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Rest Your Password",
    html: htmlContent,
  };
  try {
    const info = await transporter.sendMail(mailOptions);
    //console.log("rest password email sent:", info.response);
  } catch (error) {
    console.error("Error sending rest password email:", error);
  }
};

const sendPasswordResetSuccessEmail = async (email, name) => {
  const htmlContent = PASSWORD_RESET_SUCCESS_EMAIL_TEMPLATE.replace(
    "{name}",
    name
  );
  const mailOptions = {
    from: `"Stockify" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: " Password Reset Succefully",
    html: htmlContent,
  };
  try {
    const info = await transporter.sendMail(mailOptions);
    //console.log("rest password email sent:", info.response);
  } catch (error) {
    console.error("Error sending rest password email:", error);
  }
};

module.exports = {
  sendVerificationEmail,
  sendPasswordResetEmail,
  sendPasswordResetSuccessEmail,
};
