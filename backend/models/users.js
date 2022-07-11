const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const crypto = require("crypto");

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, "Please enter your user name"],
    },
    name: {
      type: String,
      maxLength: 32,
      required: [true, "Please enter your name"],
    },
    email: {
      type: String,
      unique: true,
      Validate: [validator.isEmail, "Please enter valid email"],
      required: [true, "Please enter your email"],
    },
    password: {
      type: String,
      required: true,
      minLength: [8, "Password should be greater than 8 characters"],
      select: false,
    },
    avatar: {
      public_id: {
        type: String,
        required: true,
      },
      urlAvatar: {
        type: String,
        required: true,
      },
    },
    role: {
      type: String,
      default: "user",
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  { timestamps: true }
);
// pre middleware function run before event save
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.SECRET, {
    expiresIn: process.env.EXPIRES,
  });
};

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");

  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.resetPasswordExpire = Date.now(+15 * 60 * 1000);

  return resetToken;
};

const userModel = mongoose.model("users", userSchema);
module.exports = userModel;
