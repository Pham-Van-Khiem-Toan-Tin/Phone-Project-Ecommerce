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

  res.status(200).json({
    success: true,
    product,
  });
});

//get all product
module.exports.getAllProducts = catchAsyncError(async (req, res, next) => {
  const resultPerPage = 8;
  const productCount = await productModel.countDocuments();
  const apiFeature = new Apifeatures(productModel.find(), req.query).search();
  let product = await apiFeature.query;
});
