const catchAsyncError = require("../middlewares/catchAsyncError");
const wishModel = require("../models/wish");
const userModel = require("../models/users");
const ErrorHandle = require("../utils/errorHandle");

module.exports.addWish = catchAsyncError(async (req, res, next) => {
  const { product_id } = req.body;
  console.log(product_id);
  const userWish = await userModel.findById(req.user).select("wish_id");
  console.log({ userWish });
  if (userWish.wish_id) {
    const wish = await wishModel.findById(userWish.wish_id);
    const productIndex = wish.products.findIndex(
      (product) => product.product_id.toString() === product_id
    );
    if (productIndex !== -1) {
      throw new ErrorHandle("Product added in your wish", 500);
    } else {
      wish.products.push({
        product_id: product_id,
      });
    }
    await wish.save();
  } else {
    const arrayProduct = [];
    arrayProduct.push({
      product_id: product_id,
    });
    const newProductWish = await wishModel.create({ products: arrayProduct });
    await userModel.findByIdAndUpdate(req.user, {
      wish_id: newProductWish._id,
    });
  }
  if (req.token) {
    const newAccessToken = req.token;
    res.status(200).json({
      success: "product added to wish",
      accessToken: newAccessToken,
    });
  } else {
    res.status(200).json({
      success: "product added to wish",
    });
  }
});

module.exports.deleteProductWish = catchAsyncError(async (req, res, next) => {
  const product_id = req.params.id;
  const userWish = await userModel.findById(req.user).select("wish_id");
  if (!userWish) {
    throw next(new ErrorHandle("You should add product to delete", 500));
  }
  await wishModel.findByIdAndUpdate(
    userWish.wish_id,
    {
      $pull: { products: { product_id: product_id } },
    },
    { new: true }
  );
  if (req.token) {
    const newAccessToken = req.token;
    res.status(200).json({
      success: "Delete product in wish successfully",
      accessToken: newAccessToken,
    });
  } else {
    res.status(200).json({
      success: "Delete product in wish successfully",
    });
  }
});

module.exports.getProductInWish = catchAsyncError(async (req, res, next) => {
  try {
    const userWish = await userModel.findById(req.user).select("wish_id");
    let result;
    if (!userWish) {
      result = [];
    }
    console.log(userWish);
    const listProductWish = await wishModel.findById(userWish.wish_id).populate({
      path: "products.product_id",
      select: "name price images category",
    });
    result = listProductWish ? listProductWish : [];
    if (req.token) {
      const newAccessToken = req.token;
      res.status(200).json({
        success: true,
        accessToken: newAccessToken,
        wish: result,
      });
    } else {
      res.status(200).json({
        success: true,
        wish: result,
      });
    }
  } catch (error) {
    console.log(error);
    return next(new ErrorHandle(error, 500));
  }
});
