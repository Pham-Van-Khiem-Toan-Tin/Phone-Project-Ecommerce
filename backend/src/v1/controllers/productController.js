const catchAsyncError = require("../middlewares/catchAsyncError");
const productModel = require("../models/products");
const ErrorHandle = require("../utils/errorHandle");
const cloudinary = require("cloudinary");
const Apifeatures = require("../utils/apifeatures");

//create product--Admin
module.exports.createProduct = catchAsyncError(async (req, res, next) => {
  let images = [];
  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }
  const imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "products",
    });
    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = imagesLinks;
  req.body.user = req.user.id;

  const product = await productModel.create(req.body);
  if(req.token) {
    const newAccessToken = req.token;
    res.status(200).json({
      success: true,
      product: product,
      accessToken: newAccessToken,
    });
  }
  else {
    res.status(200).json({
      success: true,
      product: product,
    });
  }
});

//get all product
module.exports.getAllProducts = catchAsyncError(async (req, res, next) => {
  const resultPerPage = 8;
  const productCount = await productModel.countDocuments();
  const apiFeature = new Apifeatures(productModel.find(), req.query)
    .search()
    .filter();
  let products = await apiFeature.query;
  let filteredProductsCount = products.length;
  apiFeature.pagination(resultPerPage);
  products = await apiFeature.query;
  res.status(200).json({
    success: true,
    products,
    productCount,
    resultPerPage,
    filteredProductsCount,
  });
});

//get all product -- admin

module.exports.getAdminProducts = catchAsyncError(async (req, res, next) => {
  const products = await productModel.find({});
  if(req.token) {
    const newAccessToken = req.token;
    res.status(200).json({
      success: true,
      products,
      accessToken: newAccessToken,
      
    });
  }
  else {
    res.status(200).json({
      success: true,
      products,
    });
  }
});

//get product deltails

module.exports.getProductDetails = catchAsyncError(async (req, res, next) => {
  const product = await productModel.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandle("Product not found", 404));
  }
  res.status(200).json({
    success: true,
    product,
  });
});

//update product -- admin

module.exports.updateProduct = catchAsyncError(async (req, res, next) => {
  let product = await productModel.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandle("Product not found", 404));
  }
  //image
  let images = [];
  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  if (images !== undefined) {
    //deleting from cloudinary
    for (let i = 0; i < product.images.length; i++) {
      await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    }

    const imagesLinks = [];
    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "product",
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.images = imagesLinks;
  }

  product = await productModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    product,
  });
});

//delete product --admin

module.exports.deleteProduct = catchAsyncError(async (req, res, next) => {
  const product = await productModel.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandle("Product not found", 404));
  }
  //deleting iamge form cloudinary
  for (let i = 0; i < product.images.length; i++) {
    await cloudinary.v2.uploader.destroy(product.images[i].public_id);
  }

  await product.remove();
  res.status(200).json({
    success: true,
    message: "Product delete successfully",
  });
});

//create product review or update review
module.exports.createProductReviews = catchAsyncError(
  async (req, res, next) => {
    const { rating, comment, productId } = req.body;
    const review = {
      user: req.user._id,
      name: req.name,
      rating: Number(rating),
      comment,
    };
    const product = productModel.findById(productId);

    const isReviewed = product.reviews.find(
      (rev) => rev.user.toString() === req.user._id.toString()
    );
    if (isReviewed) {
      product.reviews.forEach((rev) => {
        if (rev.user.toString() === req.user._id.toString()) {
          rev.rating = rating;
          rev.comment = comment;
        }
      });
    } else {
      product.reviews.push(review);
      product.numOfReview = product.reviews.length;
    }

    let avg = 0;
    product.reviews.forEach((rev) => {
      avg += rev.rating;
    });
    product.ratings = avg / product.reviews.length;
    await product.save({ validateBeforeSave: false });
    res.status(200).json({
      success: true,
    });
  }
);
//get all review of product
module.exports.getProductReviews = catchAsyncError(async (req, res, next) => {
  const product = productModel.findById(req.query.id);

  if (!product) {
    return next(new ErrorHandle("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});
//delete reviews
module.exports.deleteReview = catchAsyncError(async (req, res, next) => {
  const product = await productModel.findById(req.query.productId);
  if (!product) {
    return next(new ErrorHandle("Product not found", 404));
  }

  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );
  let avg = 0;
  reviews.forEach((rev) => {
    avg += rev.rating;
  });
  let ratings = 0;
  if (reviews.length === 0) {
    ratings = 0;
  } else {
    ratings = avg / reviews.length;
  }
  const numOfReview = reviews.length;

  await productModel.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReview,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );
  res.status(200).json({
    success: true,
  });
});
