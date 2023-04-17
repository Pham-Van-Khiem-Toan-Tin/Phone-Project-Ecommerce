const express = require("express");
const {
  createProduct,
  getAllProducts,
  getAdminProducts,
  getProductDetails,
  updateProduct,
  deleteProduct,
  createProductReviews,
  getProductReviews,
  deleteReview,
  getHotProducts,
} = require("../controllers/productController");
const {
  isAuthenticatedUser,
  isAuthorizeRoles,
} = require("../middlewares/auth");
const router = express.Router();

router.route("/products").get(getAllProducts);
router.route("/hotproducts").get(getHotProducts);
router
  .route("/admin/products")
  .get(isAuthenticatedUser, isAuthorizeRoles("admin"), getAdminProducts);
router
  .route("/admin/product/new")
  .post(isAuthenticatedUser, isAuthorizeRoles("admin"), createProduct);
router
  .route("/admin/product/:id")
  .put(isAuthenticatedUser, isAuthorizeRoles("admin"), updateProduct)
  .delete(isAuthenticatedUser, isAuthorizeRoles("admin"), deleteProduct);
router.route("/product/:id").get(getProductDetails);
router.route("/review").put(isAuthenticatedUser, createProductReviews);
router
  .route("/reviews")
  .get(getProductReviews)
  .delete(isAuthenticatedUser, deleteReview);

module.exports = router;
