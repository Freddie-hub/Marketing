const mongoose = require("mongoose");
const Joi = require("joi");
/*
 *To let us keep track of the user verification process that one which is usually sent
 *Over email
 */
const UserVerificationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  uniqueString: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  expiresAt: {
    type: Date,
    default: function () {
      // Set an expiration date, e.g., one hour from now
      return new Date(Date.now() + 60 * 60 * 1000);
    },
  },
});

UserVerificationSchema.index({ userId: 1 });
UserVerificationSchema.index({ uniqueString: 1 }, { unique: true });

const UserVerification = mongoose.model(
  "UserVerification",
  UserVerificationSchema
);

exports.UserVerification = UserVerification;
