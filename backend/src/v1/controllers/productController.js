const catchAsyncError = require("../middlewares/catchAsyncError");
const productModel = require("../models/products");
const ErrorHandle = require("../utils/errorHandle");
const cloudinary = require("cloudinary");
const Apifeatures = require("../utils/apifeatures");
const roleModel = require("../models/role");
const functionModel = require("../models/function");
const wishModel = require("../models/wish");
const compareModel = require("../models/compare");
const reviewModel = require("../models/reviews");


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

  const product = await productModel.create(req.body);

  if (req.token) {
    const newAccessToken = req.token;
    res.status(200).json({
      success: true,
      product: product,
      accessToken: newAccessToken,
    });
  } else {
    res.status(200).json({
      success: true,
      product: product,
    });
  }
});

//get all product
module.exports.getAllProducts = catchAsyncError(async (req, res, next) => {
  const resultPerPage = 9;
  const productsCount = await productModel.countDocuments();
  const apiFeature = new Apifeatures(productModel.find(), req.query)
    .search()
    .filter();
  let products = await apiFeature.query.clone();
  let filteredProductsCount = products.length;
  apiFeature.pagination(resultPerPage);
  products = await apiFeature.query;
  res.status(200).json({
    success: true,
    products,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  });
});

//get hort product home
module.exports.getHotProducts = catchAsyncError(async (req, res, next) => {
  const models = ["Samsung", "Xiaomi", "Apple", "Oppo"];
  const samsungProduct = await productModel
    .find({ category: "Samsung" })
    .limit(12);
  const appleProduct = await productModel.find({ category: "Apple" }).limit(8);
  const xiaomiProduct = await productModel
    .find({ category: "Xiaomi" })
    .limit(8);
  const oppoProduct = await productModel.find({ category: "Oppo" }).limit(8);
  res.status(200).json({
    success: true,
    samsungProduct,
    appleProduct,
    xiaomiProduct,
    oppoProduct,
  });
});

//get all product -- admin

module.exports.getAdminProducts = catchAsyncError(async (req, res, next) => {
  const products = await productModel.find({});
  if (req.token) {
    const newAccessToken = req.token;
    res.status(200).json({
      success: true,
      products,
      accessToken: newAccessToken,
    });
  } else {
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
        folder: "products",
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
  });
});

//create product review or update review
module.exports.createProductReviews = catchAsyncError(
  async (req, res, next) => {
    const { rating, comment, product_id } = req.body;
    const userReview = {
      user_id: req.user,
      name: req.name,
      product_id: product_id,
      rating: Number(rating),
      comment,
    };
    console.log(userReview);
    const review = await reviewModel.findOne({product_id: product_id, user_id: req.user});
    console.log("chay vao day1");
    console.log(review);
    if (review === null) {
      console.log("chay vao day2");
      const newReview = await reviewModel.create({...userReview});
    } else {
      throw new ErrorHandle("You have commented on the product", 500);
    }
    const product = await productModel.findById(product_id);
    console.log("chay den day 3");
    console.log(product.ratings);
    console.log(userReview.rating);
    product.ratings = (product.ratings * product.numOfReview + 5 + userReview.rating)/(product.numOfReview + 1);
    product.numOfReview += 1;
    await product.save({ validateBeforeSave: false });
    res.status(200).json({
      success: true,
    });
  }
);
//get all review of product
module.exports.getProductReviews = catchAsyncError(async (req, res, next) => {
  const reviews = await reviewModel.find({product_id: req.query.id});
  res.status(200).json({
    success: true,
    reviews: reviews,
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


module.exports.addWishList = catchAsyncError(async (req,res,next) => {
  const {product_id} = req.body;
  console.log(req.body);
  await wishModel.create({
    user_id: req.user,
    item: [{product_id: product_id}]
  });
  res.status(200).json({
    success: true,
  });
});
module.exports.getCompare = catchAsyncError(async (req, res, next) => {
  try {
    const compare = await compareModel.findOne({user_id: req.user}).populate({
      path: "items.product_id",
      select: "name price images",
    });
    console.log("chay vao compare");
    console.log(compare);
    res.status(200).json({
      success: true,
      compare: compare
    });
  } catch (error) {
    return next(new ErrorHandle(error, 500));
  }
})
module.exports.addCompare = catchAsyncError(async (req,res,next) => {
  try {
    const product_id = req.params.id;
    const compare = await compareModel.findOne({user_id: req.user});
    if(compare && compare.items) {
      compare.items.push({product_id: product_id});
      await compare.save();
    } else if(compare === null) {
      console.log("chay vao day 2");
      await compareModel.create({
        user_id: req.user,
        items: [{product_id: product_id}]
      });
    }
    res.status(200).json({
      success: true,
    });
  } catch (error) {
    return next(new ErrorHandle(error, 500));
  }
});

module.exports.deleteCompare = catchAsyncError(async (req, res, next) => {
  try {
    const product_id = req.params.id;
    const oldCompare = await compareModel.findOne({user_id: req.user});
    let idx = oldCompare.items.findIndex((item) => item.product_id === product_id);
    oldCompare.items.splice(idx, 1);
    await oldCompare.save();
    res.status(200).json({
      success: true,
    });
  } catch (error) {
    return next(new ErrorHandle(error, 500));
    
  }
})
