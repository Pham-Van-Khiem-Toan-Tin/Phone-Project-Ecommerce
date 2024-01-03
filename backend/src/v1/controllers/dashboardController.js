const mongoose = require("mongoose");
const userModel = require("../models/users");
const crypto = require("crypto");
const catchAsyncError = require("../middlewares/catchAsyncError");
const ErrorHandle = require("../utils/errorHandle");
const sendEmail = require("../utils/sendEmail");
const jwt = require("jsonwebtoken");
const orderModel = require("../models/orders");

module.exports.allUsers = catchAsyncError(async (req, res, next) => {

  const totalUsers = await userModel.countDocuments();
  const todayStart = new Date();
  const todayEnd = new Date();
  todayStart.setHours(0, 0, 0, 0);
  const totalNewUser = await userModel.countDocuments({
    createdAt: { $lte: todayEnd },
  });
  const orders = await orderModel.find({
    createdAt: { $lte: todayEnd }, // Trong khoảng thời gian của ngày hiện tại
  });
  const uniqueUserIds = new Set();

  // Lọc và đếm số lượng người đã thanh toán duy nhất
  orders.forEach((order) => {
    uniqueUserIds.add(order.userId); // Đảm bảo userId là chuỗi để tránh sự nhầm lẫn
  });
  const totalUserPaid = uniqueUserIds.size;
  const newUsers = await userModel.find({
    createdAt: { $lte: todayEnd },
  });
  if (req.token) {
    const newAccessToken = req.token;
    res.status(200).json({
      success: true,
      totalUsers,
      totalNewUser,
      totalUserPaid,
      newUsers,
      accessToken: newAccessToken,
      role: req.role,
    });
  } else {
    res.status(200).json({
      success: true,
      totalUsers,
      totalNewUser,
      totalUserPaid,
      newUsers,
      role: req.role,
    });
  }
});
