const catchAsyncError = require("../middlewares/catchAsyncError");
const cartModel = require("../models/cart");
const orderModel = require("../models/orders");
const productModel = require("../models/products");
const saleModel = require("../models/sales");
const userModel = require("../models/users");
const { subDays, subMonths, addDays, format } = require("date-fns");
const ErrorHandle = require("../utils/errorHandle");

async function updateStock(id, quantity) {
  const product = await productModel.findById(id);
  product.stock -= quantity;
  await product.save({ validateBeforeSave: false });
}
//create new order
module.exports.newOrder = catchAsyncError(async (req, res, next) => {
  try {
    const {
      shippingInfo,
      orderItems,
      paymentInfo,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body;
    console.log({id: req.user});
    const user = await userModel.findById(req.user);
    await cartModel.findByIdAndUpdate({ _id: user.cart_id }, { products: [] });
    const order = await orderModel.create({
      shippingInfo,
      orderItems,
      paymentInfo,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      paidAt: Date.now(),
      user: req.user,
      orderStatus: "Processing",
    });
    const today = new Date();
    const currentDay = format(today, "dd-MM-yyyy");
    const saleToday = await saleModel.findById(currentDay);
    if (saleToday != null) {
      saleToday.sales.day += totalPrice;
      saleToday.sales.week += totalPrice;
      saleToday.sales.month += totalPrice;
      saleToday.revenue.day += totalPrice - taxPrice;
      saleToday.revenue.week += totalPrice - taxPrice;
      saleToday.revenue.month += totalPrice - taxPrice;
      await saleToday.save();
    } else {
      const lastMonth = addDays(subMonths(today, 1), 1);
      const lastWeek = subMonths(today, 6);
      const saleListMonth = await saleModel.find({
        createdAt: {
          $gte: lastMonth,
          $lte: today,
        },
      });
      const newSale = {
        _id: currentDay,
        sales: {
          day: totalPrice,
          week:
            saleListMonth !== null
              ? saleListMonth
                  .filter((sale) => sale.createdAt >= lastWeek)
                  .reduce(
                    (accumulator, currentValue) =>
                      accumulator + currentValue.sales.day
                  ,0) + totalPrice
              : totalPrice,
          month:
            saleListMonth !== null
              ? saleListMonth.reduce(
                  (accumulator, currentValue) =>
                    accumulator + currentValue.sales.day
                ,0) + totalPrice
              : totalPrice,
        },
        revenue: {
          day: totalPrice - taxPrice,
          week:
            saleListMonth !== null
              ? saleListMonth
                  .filter((sale) => sale.createdAt >= lastWeek)
                  .reduce(
                    (accumulator, currentValue) =>
                      accumulator + currentValue.revenue.day
                  ,0) + totalPrice
              : totalPrice,
          month:
            saleListMonth !== null
              ? saleListMonth.reduce(
                  (accumulator, currentValue) =>
                    accumulator + currentValue.revenue.day
                ,0) + totalPrice
              : totalPrice,
        },
      };
      console.log({newSale});
      await saleModel.create(newSale);
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
  const { page } = req.query;
  const resultPerPage = 4;
  const orderCount = await orderModel.countDocuments();
  const currentPage = Number(page) || 1;
  const skip = resultPerPage * (currentPage - 1);
  const orders = await orderModel
    .find()
    .sort({ timestamp: "asc" })
    .skip(skip)
    .limit(resultPerPage);
  res.status(200).json({
    success: true,
    orders,
    resultPerPage,
    filteredOrdersCount: orderCount,
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
