const auth = require("../middleware/auth");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const { User, validate, validateUpdateDetails } = require("../models/user");
const express = require("express");
const router = express.Router();
const { UserVerification } = require("../models/userVerification");
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const axios = require("axios");
const upload = multer({ dest: "uploads/" });
const config = require("config");
const nodemailer = require("nodemailer");
const { v4: uuidv4 } = require("uuid");
const { emailMarkup } = require("../utility/email");
const { sendEmail } = require("../utility/sendEmail");
const { resendEmail } = require("../utility/resendEmail");
const { token, stkPush } = require("../utility/mpesa");

router.get("/verify/:userId/:uniqueString", async (req, res) => {
  const { userId, uniqueString } = req.params;
  const user = await UserVerification.find({ userId: userId });

  const hashedString = user[0].uniqueString;
  if (user.expiredAt < Date.now()) {
    await UserVerification.deleteOne({ userId });
    await User.deleteOne({ _id: userId });
    res.send("Sorry , the verification link expired , kindly sign up again ");
  }
  if (!user) {
    res.send(
      "Sorry , the account doesn't exist or your account has already been verified , kindly try logging in or sign up again"
    );
  }

  const outcome = await bcrypt.compare(uniqueString, hashedString);
  if (!outcome) {
    res.send(
      "<h3>Seems like this link already expired. <b>Please try logging in one more time and check in your email for the latest verification link</b></h3>"
    );
  }

  const findMe = await User.findById(userId);
  // console.log("Here We Found me... ", findMe);
  //for some reason adding the above line made the below one to work LOL
  const feedback = await User.findByIdAndUpdate(
    userId,
    {
      verified: true,
    },
    {
      new: true,
    }
  );
  // console.log(feedback, " ...feedback has ... ");
  // console.log("feedback has ... ", feedback);
  let userReObtained = await User.findOne({ Email: feedback.Email });
  let token = req.query.token;
  // console.log("This is the token passed down : ");
  res
    .header("x-auth-token", token)
    .send(_.pick(userReObtained, ["_id", "email", "isAdmin"]));

  //it means the user got successfully verified
});

router.get("/me", auth, async (req, res) => {
  if (req.user._id === undefined)
    return res.status(400).send("Invalid user ID.");
  const user = await User.findById(req.user._id).select("-password");
  res.send(user);
});

//depending on views passed in the req, calculate views * 0.1 and add to wallet balance
router.put("/updateWallet", auth, async (req, res) => {
  const userId = req.user._id;
  const user = await User.findById(userId);
  if (!user) return res.status(404).send("User not found.");
  if (!req.body.category)
    return res.status(404).send("Please select atlease one category.");

  if (!user.IsEligibleToWork) {
    // to let the ui know when to call the payment
    // ideally you should do a pop up which after user taps okay
    // we now cause the stk push , but ni front end inacall that
    //so here we are just baring you from accessing the payment before commiting to work
    return res
      .status(404)
      .send(
        "You need to pay for subscription first. You will receive a pop up on your phone to pay for subscription. Once you pay, you will be able to start working."
      );
  }

  const selectedCategory = req.body.category.toLowerCase();
  let viewsValue = 0;
  if (selectedCategory == "whatsapp") {
    viewsValue = 2.5;
  } else if (selectedCategory == "facebook") {
    viewsValue = 2.5;
  } else if (selectedCategory == "instagram" || selectedCategory == "twitter") {
    viewsValue = 2.5;
  } else if (selectedCategory == "tiktok") {
    viewsValue = 2.5;
  }

  const views = req.body.views;
  const walletBalance = (user.walletBalance + views * viewsValue).toFixed(2);
  const updated = await User.findByIdAndUpdate(
    userId,
    {
      walletBalance: walletBalance,
    },
    { new: true }
  );
  res.send(updated);
});

router.post("/stkPush", token, stkPush);

router.post("/stk_callback", async (req, res, next) => {
  console.log("------STK Called Back ------");
  if (!req.body.Body.stkCallback?.CallbackMetadata) {
    req.result = req.body.Body.stkCallback.ResultDesc;
    console.log(
      "No call back metadata ... ",
      req.body.Body.stkCallback.ResultDesc
    );
    return;
  }
  const resultArray = req.body.Body.stkCallback?.CallbackMetadata?.Item;
  const PhoneNumber = resultArray?.find(
    (item) => item.Name === "PhoneNumber"
  ).Value;
  console.log("Phone ... ", PhoneNumber, "item array... ", resultArray);

  // req.body.Body.stkCallback.CallbackMetadata.item

  const gotUser = await User.find({ PhoneNumber: PhoneNumber });

  const updatedUser = await Request.findOneAndUpdate(
    { UserIdReference: gotUser._id },
    {
      $update: {
        IsPaid: true,
      },
    },
    { new: true }
  );
  console.log(updatedUser);
  return updatedUser;
});

// Update user data
router.put("/:id", auth, async (req, res) => {
  const userId = req.params.id;

  // Validate the request body based on your User schema
  const { error } = validateUpdateDetails(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const salt = await bcrypt.genSalt(10);

  if (req.body?.password != null) {
    req.body.password = await bcrypt.hash(req.body.password, salt);
  }

  const updated = await User.findByIdAndUpdate(userId, req.body, { new: true });

  if (!updated) return res.status(404).send("User not found.");

  // Respond with the updated user object
  res.send(updated ? "User updated successfully." : "User not updated.");
});

router.post("/", async (req, res) => {
  let refCode = "";
  const { error } = validate(req.body);
  if (error) {
    console.log(error.details[0].message);
    return res.status(400).send(error.details[0].message);
  }

  let user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).send("User already registered.");
  }

  user = new User(
    _.pick(req.body, [
      "email",
      "password",
      "phoneNumber",
      "firstName",
      "lastName",
    ])
  );

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  const result = await user.save();

  if (req.body.referalCode == null) {
    const emailParts = req.body.email.split("@");
    const localPart = emailParts[0];

    // Hash the local part of the email
    const hashedEmail = crypto
      .createHash("sha256")
      .update(localPart)
      .digest("hex")
      .substring(0, 6); // Taking only first 6 characters of the hash

    // Generate referral code based on user details
    const referralCode = generateReferralCode(result) + hashedEmail; // Adding hashed email to referral code
    console.log("referralCode:  .........", referralCode);
    refCode = referralCode;

    // await User.findByIdAndUpdate(result._id, { referralCode: referralCode });
    const updated = await User.findByIdAndUpdate(
      result._id,
      {
        referalCode: referralCode,
      },
      { new: true }
    );
  } else refCode = req.body.referalCode;

  let resultFound = await User.findOne({
    referalCode: req.body.referalCode,
  }).populate("referals");
  if (resultFound) {
    //check to ensure that the users are uniques so that we redeem only when the user is new
    if (resultFound.referals.some((obj) => obj.email !== req.body.email)) {
      //send the payment to the user here
      //if pay succeeded we mark the referal as used by adding the user to the array
      await User.findByIdAndUpdate(resultFound._id, {
        $push: { referals: result._id },
      });
    }
  }

  const token = user.generateAuthToken();
  if (token) {
    resendEmail(
      { _id: result._id, email: result.email, firstName: result.firstName },
      res,
      token,
      refCode
    );
  }

  if (!token) return res.status(201).send("Account created succesfully.");
});

function generateReferralCode(user) {
  const userId = user._id.toString(); // Convert ObjectId to string
  const phoneDigits = user.phoneNumber.toString(); // Convert phone number to string

  // Extract first 3 digits (reversed) and middle 3 digits
  const firstDigits = phoneDigits.substr(0, 3).split("").reverse().join("");
  const middleDigits = phoneDigits.substr(3, 3);

  // Extract last 3 digits from reversed user ID
  const lastDigits = userId.substr(-3).split("").reverse().join("");

  // Form the referral code
  const referralCode = `${firstDigits}${middleDigits}${lastDigits}`;
  return referralCode;
}

module.exports = router;
