const catchAsyncError = require("../middlewares/catchAsyncError");
const colorModel = require("../models/color");
const ErrorHandle = require("../utils/errorHandle");

module.exports.getAllColor = catchAsyncError(async (req, res, next) => {
  const resultPerPage = 9;
  const { page, key } = req.query;
  const currentPage = Number(page) || 1;
  const skip = resultPerPage * (currentPage - 1);
  let query = {};
  if (key) {
    const caseInsensitiveRegex = new RegExp(key, "i");
    query = { _id: caseInsensitiveRegex };
  }
  const colorCount = await colorModel.countDocuments(query);
  const allColors = await colorModel
    .find(query)
    .skip(skip)
    .limit(resultPerPage);
  res.status(200).json({
    success: true,
    allColors,
    resultPerPage,
    filteredColorCount: colorCount,
  });
});
module.exports.createColor = catchAsyncError(async (req, res, next) => {
  try {
    console.log("chay vao day");
    const { name, description, hex } = req.body;
    const isExist = await colorModel.exists({ _id: name });
    if (!isExist) {
      await colorModel.create({
        _id: name,
        description: description,
        hex: hex,
      });
    } else throw new ErrorHandle("Color already exists", 500);
    res.status(200).json({
      success: true,
      message: "create color successfully!",
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports.updateColor = catchAsyncError(async (req, res, next) => {
  try {
    const { name, description, hex } = req.body;
    const color = await colorModel.findByIdAndUpdate(name, {
      description: description,
      hex: hex,
    });
    if (!color) throw new ErrorHandle("Color not found", 400);
  
    res.status(200).json({
      success: true,
      message: "update color successfully!",
    });
    
  } catch (error) {
    console.log(error);
  }
});
module.exports.deleteCategory = catchAsyncError(async (req, res, next) => {
  const { name } = req.body;
  const color = await colorModel.findByIdAndDelete(name);
  if (!color) throw new ErrorHandle("Color not found", 400);
  res.status(200).json({
    success: true,
    message: "Delete color successfully!",
  });
});
