const catchAsyncError = require("../middlewares/catchAsyncError");
const cartModel = require("../models/cart");
const userModel = require("../models/users");
const ErrorHandle = require("../utils/errorHandle");

module.exports.addCart = catchAsyncError(async (req, res, next) => {
  const { producId, quanlityProduct } = req.body;
  const userCart = await userModel.findById(req.id).select("cartId");
  if (userCart) {
    const cart = await cartModel.findById(userCart.cartId);
    const productIndex = cart.caProduct.findIndex((product) => {
      product.id_product === producId;
    });
    if (productIndex !== -1) {
      cart.caProduct[productIndex].quantity += quanlityProduct;
    } else {
      cart.caProduct.push({
        id_product: producId,
        quantity: quanlityProduct,
      });
    }
    await cart.save();
  } else {
    const arrayProduct = [];
    arrayProduct.push({
      id_product: producId,
      quantity: quanlityProduct,
    });
    const newProductCart = await cartModel.create({ caProduct: arrayProduct });
    userCart.cartId = newProductCart._id;
    await userCart.save();
  }
  if (req.token) {
    const newAccessToken = req.token;
    res.status(200).json({
      success: true,
      accessToken: newAccessToken,
    });
  } else {
    res.status(200).json({
      success: true,
    });
  }
});
