const config = require("config");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    minlength: 5,
    maxlength: 320, // Maximum length for an email address (according to the RFC 5321)
    unique: true,
    validate: {
      validator: (value) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(value);
      },
      message: "Invalid email format",
    },
  },
  firstName: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 1024,
  },

  lastName: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 1024,
  },

  phoneNumber: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 20,
  },

  referalCode: {
    type: String,
    default: "123456789",
  },

  referals: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  verified: {
    type: Boolean,
    default: false,
  },

  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
    select: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  IsPaid: {
    type: Boolean,
    default: false,
  },
  IsEligibleToWork: {
    type: Boolean,
    default: false,
  },
  walletBalance: {
    type: Number,
    default: 0,
  },
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      email: this.email,
      isAdmin: this.isAdmin,
    },
    config.get("jwtPrivateKey")
  );
  return token;
};

const User = mongoose.model("User", userSchema);

function validateUser(User) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(320).required().email(),
    password: Joi.string().min(5).max(1024).required(),
    firstName: Joi.string().min(1).max(1024).required(),
    lastName: Joi.string().min(1).max(1024).required(),
    phoneNumber: Joi.string().min(10).max(20).required(),
    isAdmin: Joi.boolean(),
  });

  return schema.validate(User);
}
function validateUserForUpdate(User) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(320).email(),
    password: Joi.string().min(5).max(1024),
    firstName: Joi.string().min(1).max(1024),
    lastName: Joi.string().min(1).max(1024),
    phoneNumber: Joi.string().min(10).max(20),
    isAdmin: Joi.boolean(),
    userDevicePushToken: Joi.string(),
  });

  return schema.validate(User);
}

exports.User = User;
exports.validate = validateUser;
exports.validateUpdateDetails = validateUserForUpdate;
