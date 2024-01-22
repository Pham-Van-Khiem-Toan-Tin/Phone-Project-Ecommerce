const express = require("express");
const {
  isAuthenticatedUser,
  isAuthorizeRoles,
} = require("../middlewares/auth");
const {
  createCategory,
  updateCategory,
  getAllCategory,
} = require("../controllers/category.Controller");
const router = express.Router();
router
  .route("/admin/category")
  .get(isAuthenticatedUser, isAuthorizeRoles("admin"), getAllCategory)
  .post(isAuthenticatedUser, isAuthorizeRoles("admin"), createCategory)
  .put(isAuthenticatedUser, isAuthorizeRoles("admin"), updateCategory);

module.exports = router;
