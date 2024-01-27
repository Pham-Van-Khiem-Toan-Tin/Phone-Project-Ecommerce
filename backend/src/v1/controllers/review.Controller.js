const catchAsyncError = require("../middlewares/catchAsyncError");
const categoryModel = require("../models/category");
const reviewModel = require("../models/reviews");
const ErrorHandle = require("../utils/errorHandle");

module.exports.getAllReviews = catchAsyncError(async (req, res, next) => {
  const resultPerPage = 9;
  const { page, key } = req.query;
  const currentPage = Number(page) || 1;
  const skip = resultPerPage * (currentPage - 1);
  let query = {};
  if (key) {
    const caseInsensitiveRegex = new RegExp(key, "i");
    query = { name: caseInsensitiveRegex };
  }
  const reviewCount = await reviewModel.countDocuments(query);
  const allReviews = await reviewModel
    .find(query)
    .skip(skip)
    .limit(resultPerPage);
  res.status(200).json({
    success: true,
    allReviews,
    resultPerPage,
    filteredReviewCount: reviewCount,
  });
});

module.exports.feedBack = catchAsyncError(async (req, res, next) => {
  const { id, description } = req.body;
  const review = await reviewModel.findByIdAndUpdate(id, {feed_back: description});
  if (!review) throw new ErrorHandle("Review not found", 400);
  res.status(200).json({
    success: true,
    message: "Feedback successfully!",
  });
});
module.exports.deleteReviews = catchAsyncError(async (req, res, next) => {
  const { id } = req.query;
  const review = await reviewModel.findByIdAndDelete(id);
  if (!review) throw new ErrorHandle("Review not found", 400);
  res.status(200).json({
    success: true,
    message: "Delete feedback successfully!",
  });
});
