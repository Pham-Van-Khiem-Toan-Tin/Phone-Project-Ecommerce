const mongoose = require("mongoose");
const userModel = require("../models/users");
const crypto = require("crypto");
const sendToken = require("../utils/jwtToken");
const cloudinary = require("cloudinary");
const catchAsyncError = require("../middlewares/catchAsyncError");
const ErrorHandle = require("../utils/errorHandle");
const sendEmail = require("../utils/sendEmail");
const jwt = require("jsonwebtoken");

module.exports.register = catchAsyncError(async (req, res, next) => {
  const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
    folder: "avatar",
    width: 150,
    crop: "scale",
  });
  let {
    name,
    email,
    password
  } = req.body;
  const user = await userModel.create({
    name,
    email,
    password,
    avatar: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
  });
  sendToken(user, 201, res);
});

//Login  user
module.exports.loginUser = catchAsyncError(async (req, res, next) => {
  const {
    email,
    password
  } = req.body;
  
  //checking if user have eamil and password
  if (!email || !password) {
    return next(new ErrorHandle("Please Enter Email and Password", 400));
  }
  const user = await userModel.findOne({
    email
  }).select("+password");
  
  if (!user) {
    return next(new ErrorHandle("Invalid email or password", 401));
  }
  const passwordIsMatch = await user.comparePassword(password);
  if (!passwordIsMatch) {
    return next(new ErrorHandle("Invalid email or password", 401));
  }
  sendToken(user, 200, res);
});

//Logout user
module.exports.logout = catchAsyncError(async (req, res, next) => {
  req.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});

//Forgot password
module.exports.forgotPassword = catchAsyncError(async (req, res, next) => {
  const user = await userModel.findOne({
    email: req.body.email
  });

  if (!user) {
    return next(new ErrorHandle("User not found", 404));
  }

  //Get reset password
  const resetToken = user.getResetPasswordToken();
  await user.save({
    validateBeforeSave: false
  });

  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/password/reset/${resetToken}`;
  const message = `Your password reset token is:- \n\n ${resetPasswordUrl} \n\n If you have not this request email then, please ignore it.`;

  try {
    await sendEmail({
      email: user.email,
      subject: "Ecommerce Password Recovery",
      message,
    });
    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({
      validateBeforeSave: false
    });

    return next(new ErrorHandle(error.message, 500));
  }
});

//Reset password
module.exports.resetPassword = catchAsyncError(async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.param.token)
    .digest("hex");
  const user = await userModel.findOne({
    resetPasswordToken,
    resetPasswordExpire: {
      $gt: Date.now()
    },
  });

  if (!user) {
    return next(
      new ErrorHandle("Reset password token is invalid or has been expired"),
      400
    );
  }
  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandle("Password does not password", 400));
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();
  sendToken(user, 200, res);
});

module.exports.getUserDetails = catchAsyncError(async (req, res, next) => {
  const user = await userModel.findById(req.user);
  if(req.token) {
    const newAccessToken = req.token;
    res.status(200).json({
    success: true,
    user,
    accessToken: newAccessToken,
  });
  } else {
    res.status(200).json({
      success: true,
      user,
    });
  }
  
});

//Update user password
module.exports.updatePassword = catchAsyncError(async (req, res, next) => {
  const user = await userModel.findById(req.user.id).select("+password");
  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);
  if (!isPasswordMatched) {
    return next(new ErrorHandle("Old password is incorrect", 400));
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHandle("password does not match", 400));
  }
  user.password = req.body.newPassword;

  await user.save();

  sendToken(user, 200, res);
});

//update user profile
module.exports.updateProfile = catchAsyncError(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  };
  if (req.body.avatar !== "") {
    const user = await userModel.findById(req.user.id);
    const imageId = user.avatar.public_id;
    await cloudinary.v2.uploader.destroy(imageId);
    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "avatars",
      width: 150,
      crop: "scale",
    });

    newUserData.avatar = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };
  }

  const user = await userModel.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});

//get all user(admin)
module.exports.getAllUser = catchAsyncError(async (req, res, next) => {
  const users = await userModel.find({});
  if(req.token) {
    const newAccessToken = req.token;
    res.status(200).json({
      success: true,
      users,
      accessToken: newAccessToken,
      role: req.role
    });
  }
  else {
    res.status(200).json({
      success: true,
      users,
      role: req.role
    });
  }
});

//get single user(admin)
module.exports.getSingleUser = catchAsyncError(async (req, res, next) => {
  const user = await userModel.findById(req.params.id);
  if (!user) {
    return next(
      new ErrorHandle(`User does not exist with Id: ${req.params.id}`)
    );
  }
  if(req.token) {
    const newAccessToken = req.token;
    res.status(200).json({
      success: true,
      user,
      accessToken: newAccessToken,
    });
  }
  else {
    res.status(200).json({
      success: true,
      user,
    });
  }
  
});

//update user role --Admin
module.exports.updateUserRole = catchAsyncError(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };

  await userModel.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  if(req.token) {
    const newAccessToken = req.token;
    res.status(200).json({
      success: true,
      accessToken: newAccessToken,
    });
  }
  else {
    res.status(200).json({
      success: true,
    });
  }
  
});

//delete user(admin)
module.exports.deleteUser = catchAsyncError(async (req, res, next) => {
  
  const user = await userModel.findById(req.params.id);
  if (!user) {
    return next(
      new ErrorHandle(`User does not exist with Id: ${req.params.id}`, 400)
    );
  }
  
  const imageId = user.avatar.public_id;
  await cloudinary.v2.uploader.destroy(imageId);
  await user.remove();
  if(req.token) {
    const newAccessToken = req.token;
    res.status(200).json({
      success: true,
      message: "User delete successfully!",
      accessToken: newAccessToken,
    });
  }
  else {
    res.status(200).json({
      success: true,
      message: "User delete successfully!",
    });
  }
});

