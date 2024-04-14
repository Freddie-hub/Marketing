const { UserVerification } = require("../models/userVerification");
const bcrypt = require("bcrypt");
const config = require("config");
const nodemailer = require("nodemailer");
const { emailMarkup } = require("../utility/email");
const { v4: uuidv4 } = require("uuid");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: config.get("COMPANY_EMAIL"),
    pass: config.get("COMPANY_PASSWORD"),
  },
});
//Mail Verification
transporter.verify((error, success) => {
  error
    ? console.warn(error)
    : console.log("Mail Server Operationality : ", success);
});

const sendEmail = async ({ _id, email }, res, token) => {
  const url = config.get("LIVE_URL");

  const salt = await bcrypt.genSalt(10);
  let ThirtyMinutes = 1800000;
  const uniqueString = uuidv4() + _id;
  const mailOptions = {
    from: config.get("COMPANY_EMAIL"),
    to: email,
    subject: "Verify Your Email",
    html: emailMarkup(url, _id, uniqueString, token),
  };
  const hashedString = await bcrypt.hash(uniqueString, salt);

  const newVerification = new UserVerification({
    userId: _id,
    uniqueString: hashedString,
    createdAt: Date.now(),
    expiredAt: Date.now() + ThirtyMinutes,
  });

  const verificationResult = await newVerification.save();
  // console.log("User ver Results... ", verificationResult);
  // console.log("User ver... ");

  const sendEmailResults = transporter.sendMail(mailOptions);

  console.log("Verification Email Successfully sent");
  if (sendEmailResults.error) {
    console.warn(sendEmailResults.error);
    console.log("Verifying Your Email Failed");
  }

  if (verificationResult.error) {
    console.log("An error occurred");
  }

  if (newVerification.error) {
    console.warn(newVerification.error);
    console.log("An error occurred");
    res.json({
      status: "FAILED",
      message: "An error occurred",
    });
  }
};

exports.sendEmail = sendEmail;
