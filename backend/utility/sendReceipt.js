const config = require("config");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: config.get("COMPANY_EMAIL"),
    pass: config.get("COMPANY_PASSWORD"),
  },
});
transporter.verify((error, success) => {
  error
    ? console.warn(error)
    : console.log("Mail Server Operationality for receipts: ", success);
});

const sendReceipt = async (engineerName, userName, pin) => {
  const mailOptions = {
    from: config.get("COMPANY_EMAIL"),
    to: email,
    subject: "Order Receipt",
    html: receiptEmailMarkup(engineerName, userName, pin),
  };

  const sendEmailResults = transporter.sendMail(mailOptions);
  console.log("Receipt Email Successfully sent");

  if (sendEmailResults.error) {
    console.warn(sendEmailResults.error);
    console.log("Sending Receipt Email failed...");
  }

  if (sendEmailResults.error) {
    console.log("An error occurred while sending email for receipt...");
  }

  if (sendEmailResults.error) {
    console.warn(sendEmailResults.error);
    console.log("An error occurred while sending email for receipt...");
    // res.json({
    //   status: "FAILED",
    //   message: "An error occurred while sending email for receipt...",
    // });
  }
};

module.exports = sendReceipt;
