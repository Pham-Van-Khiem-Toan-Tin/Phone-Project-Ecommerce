const catchAsyncError = require("../middlewares/catchAsyncError");
const orderModel = require("../models/orders");
const productModel = require("../models/products");
const ErrorHandle = require("../utils/errorHandle");

async function updateStock(id, quantity) {
  const product = await productModel.findById(id);
  product.stock -= quantity;
  await product.save({ validateBeforeSave: false });
}
//create new order
module.exports.newOrder = catchAsyncError(async (req, res, next) => {
  const {
    shippingInfor,
    orderItems,
    paymentInfor,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;
  const order = await orderModel.create({
    shippingInfor,
    orderItems,
    paymentInfor,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id,
  });

  res.status(200).json({
    success: true,
    order,
  });
});

//get single order
module.exports.getSingleOrder = catchAsyncError(async (req, res, next) => {
  const order = await orderModel
    .findById(req.params.id)
    .populate("user", "name email");
  if (!order) {
    return next(new ErrorHandle("Order not found with this user", 404));
  }

  res.status(200).json({
    success: true,
    order,
  });
});

//get logged in user orders
module.exports.myOrders = catchAsyncError(async (req, res, next) => {
  const orders = await orderModel.find({ user: req.user });
  res.status(200).json({
    success: true,
    orders,
  });
});

//get all orders -- admin
module.exports.getAllOrders = catchAsyncError(async (req, res, next) => {
  const orders = orderModel.find({});

  let totalAmount = 0;
  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });

  res.status(200).json({
    success: true,
    totalAmount,
    orders,
  });
});

//update order status --admin
module.exports.updateOrder = catchAsyncError(async (req, res, next) => {
  const order = await orderModel.findById(req.params.id);
  if (!order) {
    return next(new ErrorHandle("Order not found with this user", 404));
  }
  if (order.orderStatus === "Delivered") {
    return next(new ErrorHandle("You have already delivered this order", 404));
  }
  if (req.body.status === "Shipped") {
    order.orderItems.forEach(async (od) => {
      await updateStock(od.product, od.quantity);
    });
  }
  order.orderStatus = req.body.status;
  if (req.body.status === "Delivered") {
    order.deliveredAt = Date.now();
  }

  await order.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
  });
});

//delete order--admin
module.exports.deleteOrder = catchAsyncError(async (req, res, next) => {
  const order = await orderModel.findById(req.params.id);
  if (!order) {
    return next(new ErrorHandle("Order not found with this user", 404));
  }
  await order.remove();
  res.status(200).json({
    success: true,
  });
});
