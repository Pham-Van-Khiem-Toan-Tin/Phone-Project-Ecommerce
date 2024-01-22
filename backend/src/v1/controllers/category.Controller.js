const catchAsyncError = require("../middlewares/catchAsyncError");
const categoryModel = require("../models/category");
const ErrorHandle = require("../utils/errorHandle");

module.exports.getAllCategory = catchAsyncError(async (req, res, next) => {
  const resultPerPage = 9;
  const { page, key } = req.query;
  const currentPage = Number(page) || 1;
  const skip = resultPerPage * (currentPage - 1);
  let query = {};
  if (key) {
    const caseInsensitiveRegex = new RegExp(key, "i");
    query = { name: caseInsensitiveRegex };
  }
  const categoryCount = await categoryModel.countDocuments(query);
  const allCategory = await categoryModel
    .find(query)
    .skip(skip)
    .limit(resultPerPage)
    .populate({ path: "parent", select: "name" });
  res.status(200).json({
    success: true,
    allCategory,
    resultPerPage,
    filteredCategoryCount: categoryCount,
  });
});
module.exports.createCategory = catchAsyncError(async (req, res, next) => {
  const { name, description, parentId } = req.body;
  if (parentId) {
    const isExist = await categoryModel.exists({
      name: name,
      parent: parentId,
    });
    if (!isExist) {
      await categoryModel.create({
        name: name,
        description: description,
        parent: parentId,
      });
    } else throw new ErrorHandle("Category already exists", 500);
  } else {
    await categoryModel.create({ name: name, description: description });
  }
  res.status(200).json({
    success: true,
    message: "create category successfully!",
  });
});

module.exports.updateCategory = catchAsyncError(async (req, res, next) => {
  const { id, name, description, parentId } = req.body;
  const category = await categoryModel.findById(id);
  if (!category) throw new ErrorHandle("Category not found", 400);
  category.name = name;
  category.description = description;
  parentId && (category.parent = parentId);
  await category.save();
  res.status(200).json({
    success: true,
    message: "update category successfully!",
  });
});
