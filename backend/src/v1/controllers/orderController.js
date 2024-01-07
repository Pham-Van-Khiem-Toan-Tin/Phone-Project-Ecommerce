const catchAsyncError = require("../middlewares/catchAsyncError");
const cartModel = require("../models/cart");
const orderModel = require("../models/orders");
const productModel = require("../models/products");
const saleModel = require("../models/sales");
const userModel = require("../models/users");
const ErrorHandle = require("../utils/errorHandle");
const moment = require("moment");
async function updateStock(id, quantity) {
  const product = await productModel.findById(id);
  product.stock -= quantity;
  await product.save({ validateBeforeSave: false });
}
//create new order
module.exports.newOrder = catchAsyncError(async (req, res, next) => {
  try {
    
    const {
      shippingInfor,
      orderItems,
      paymentInfor,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body;
    const user = await userModel.findOneAndUpdate(
      { _id: req.user },
    );
    console.log("chay den day 123");
    await cartModel.findByIdAndUpdate({ _id: user.cartId }, {caProduct: []});
    const order = await orderModel.create({
      shippingInfor,
      orderItems,
      paymentInfor,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      paidAt: Date.now(),
      user: req.user,
      orderStatus: "Processing",
    });
    const time = moment().format("DD-MM-YYYY");
    const saleToday = await saleModel.findById(time);
    if (saleToday != null) {
      saleToday.today_sales += totalPrice;
      saleToday.weekly_sales += totalPrice;
      saleToday.monthly_sales += totalPrice;
      saleToday.today_revenue += totalPrice - taxPrice;
      saleToday.weekly_revenue += totalPrice - taxPrice;
      saleToday.monthly_revenue += totalPrice - taxPrice;
      saleToday.in_escrow += totalPrice - taxPrice;
      await saleToday.save();
    } else {
      await saleModel.create({
        _id: time,
        today_sales: totalPrice,
        weekly_sales: totalPrice,
        monthly_sales: totalPrice,
        today_revenue: totalPrice - taxPrice,
        weekly_revenue: totalPrice - taxPrice,
        monthly_revenue: totalPrice - taxPrice,
        in_escrow: totalPrice - taxPrice,
      });
    }
    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.log(error);
  }
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
  const orders = await orderModel.find({});
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
