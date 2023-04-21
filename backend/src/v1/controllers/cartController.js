
const catchAsyncError = require("../middlewares/catchAsyncError");
const cartModel = require("../models/cart");
const userModel = require("../models/users");
const ErrorHandle = require("../utils/errorHandle");

module.exports.addCart = catchAsyncError(async (req, res, next) => {
  const { producId, quanlityProduct } = req.body;
  const userCart = await userModel.findById(req.user).select("cartId");
  if (userCart.cartId) {
    const cart = await cartModel.findById(userCart.cartId);
    const productIndex = cart.caProduct.findIndex((product) => product.id_product.toString() === producId);
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
    const user = await userModel.findByIdAndUpdate(req.user, {cartId: newProductCart._id});
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

module.exports.getProductInCart = catchAsyncError(async (req, res, next) => {
  try {
    const cartId = req.cart;
    const listProductCart = await cartModel.findById(cartId).populate({
      path: "caProduct.id_product",
      select: "name price images category"
    });
    console.log(listProductCart);
    console.log(listProductCart.caProduct.length);
    var total = 0;
    if(listProductCart) {
      for (let i = 0; i < listProductCart.caProduct.length; i++) {
        total = total + listProductCart.caProduct[i].id_product.price * listProductCart.caProduct[i].quantity;
      }
    }
    
    if (req.token) {
      const newAccessToken = req.token;
      res.status(200).json({
        success: true,
        accessToken: newAccessToken,
        cart: listProductCart,
        total: total
      });
    } else {
      res.status(200).json({
        success: true,
        cart: listProductCart,
        total: total
      });
    }
  } catch (error) {
    return next(new ErrorHandle(error, 500));
  }
})

