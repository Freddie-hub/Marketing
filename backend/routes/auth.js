const Joi = require("joi");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const { User } = require("../models/user");
const mongoose = require("mongoose");
const express = require("express");
const { resendEmail } = require("../utility/resendEmail");
const config = require("config");
const router = express.Router();

router.post("/", async (req, res) => {
  console.log(
    "Login AUth endpoint called...     ",
    ">>>>>>>>>>>>>>>>>>>>>>",
    req.body
  );
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email }).select(
    "password email isAdmin verified firstName referalCode"
  );
  if (!user) return res.status(400).send("Invalid email or password.");

  const token = user.generateAuthToken();

  if (!user.verified && config.get("allowMailVerification") == "true") {
    // console.log(
    //   ">>>>>>>>>>>>>>>>>>>>>>",
    //   config.get("allowMailVerification") == "true",
    //   ">>>verified?",
    //   user.verified
    // );
    resendEmail(user, res, token, user.referalCode);
    // res.status(400).send("Check your email for verification first...");
  }

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid email or password.");

  if (user.verified || !(config.get("allowMailVerification") == "true")) {
    res.send(token);
  }
});

function validate(req) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  });

  return schema.validate(req);
}

module.exports = router;
