const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const crypto = require("crypto");
const { generateToken } = require("../middlewares/auth");
const ObjectId = mongoose.Schema.ObjectId;

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please Enter Your Name"],
      minLength: [2, "Name should have more than 2 characters"],
      maxLength: [32, "Name can not exceed 32 characters"],
    },
    email: {
      type: String,
      required: [true, "Please Enter Your Email"],
      unique: true,
      validate: [validator.isEmail, "Please Enter a valid Email"],
    },
    password: {
      type: String,
      required: [true, "Please Enter Your Password"],
      minLength: [8, "Password should be greater than 8 character"],
      select: false,
    },
    avatar: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    wishList: [
      {
        wProduct: {
          type: ObjectId,
          ref: "products",
        },
      },
    ],
    role: {
      type: String,
      default: "user",
    },
    listRefeshToken: [
      {
        refeshToken: {
          type: String,
        },
      },
    ],
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

userSchema.methods.getAccessToken = function () {
  const accessToken = generateToken(
    { id: this._id },
    process.env.ACESSTOKEN_SECRET,
    process.env.ACESSTOKEN_EXPIRES
  );
  return accessToken;
};

userSchema.methods.getRefeshToken = function () {
  const refeshToken = generateToken(
    { id: this._id },
    process.env.REFESHTOKEN_SECRET,
    process.env.REFESHTOKEN_EXPIRES
  );
  return refeshToken;
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
  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
  return resetToken;
};

const userModel = mongoose.model("users", userSchema);
module.exports = userModel;
