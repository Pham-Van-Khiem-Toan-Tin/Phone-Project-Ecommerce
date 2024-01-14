const catchAsyncError = require("../middlewares/catchAsyncError");
const cartModel = require("../models/cart");
const userModel = require("../models/users");
const ErrorHandle = require("../utils/errorHandle");

module.exports.addCart = catchAsyncError(async (req, res, next) => {
  const { product_id, quantity_product } = req.body;
  const userCart = await userModel.findById(req.user).select("cart_id");
  console.log({userCart});
  if (userCart.cart_id) {
    const cart = await cartModel.findById(userCart.cart_id);
    const productIndex = cart.products.findIndex(
      (product) => product.product_id.toString() === product_id
    );
    if (productIndex !== -1) {
      cart.products[productIndex].quantity += quantity_product;
    } else {
      cart.products.push({
        product_id: product_id,
        quantity: quantity_product,
      });
    }
    await cart.save();
  } else {
    const arrayProduct = [];
    arrayProduct.push({
      product_id: product_id,
      quantity: quantity_product,
    });
    const newProductCart = await cartModel.create({ products: arrayProduct });
    await userModel.findByIdAndUpdate(req.user, {
      cart_id: newProductCart._id,
    });
  }
  if (req.token) {
    const newAccessToken = req.token;
    res.status(200).json({
      success: "product added to cart",
      accessToken: newAccessToken,
    });
  } else {
    res.status(200).json({
      success: "product added to cart",
    });
  }
});

module.exports.deleteProductCart = catchAsyncError(async (req, res, next) => {
  const product_id = req.params.id;
  const userCart = await userModel.findById(req.user).select("cartId");
  if (!userCart) {
    throw next(new ErrorHandle("You should add product to delete", 500));
  }
  await cartModel.findByIdAndUpdate(
    userCart.cart_id,
    {
      $pull: { products: { product_id: product_id } },
    },
    { new: true }
  );
  if (req.token) {
    const newAccessToken = req.token;
    res.status(200).json({
      success: "Delete product in cart successfully",
      accessToken: newAccessToken,
    });
  } else {
    res.status(200).json({
      success: "Delete product in cart successfully",
    });
  }
});

module.exports.getProductInCart = catchAsyncError(async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user);
    const listProductCart = await cartModel.findById(user.cart_id).populate({
      path: "products.product_id",
      select: "name price images category",
    });
    console.log({test: listProductCart.products});
    var total = 0;
    console.log("chay den day 1");
    if (listProductCart) {
      for (let i = 0; i < listProductCart.products.length; i++) {
        total =
          total +
          listProductCart.products[i].product_id.price *
            listProductCart.products[i].quantity;
      }
    }
    console.log("chay den day 2");

    if (req.token) {
      const newAccessToken = req.token;
      res.status(200).json({
        success: true,
        accessToken: newAccessToken,
        cart: listProductCart,
        total: total,
      });
    } else {
      res.status(200).json({
        success: true,
        cart: listProductCart,
        total: total,
      });
    }
  } catch (error) {
    return next(new ErrorHandle(error, 500));
  }
});
