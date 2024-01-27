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
  addWishList,
  addCompare,
  getCompare,
  deleteCompare,
} = require("../controllers/productController");
const {
  isAuthenticatedUser,
  isAuthorizeRoles,
} = require("../middlewares/auth");
const { addCart } = require("../controllers/cartController");
const { getAllReviews, feedBack, deleteReviews } = require("../controllers/review.Controller");
const { addWish } = require("../controllers/wish.Controller");
const router = express.Router();

router.route("/products").get(getAllProducts);
router.route("/hotproducts").get(getHotProducts);
router.route("/addcart").put(isAuthenticatedUser, addCart);
router.route("/addwish").put(isAuthenticatedUser, addWish);
router.route("/wish/add").post(isAuthenticatedUser, addWishList);
router.route("/compare").get(isAuthenticatedUser, getCompare);
router
  .route("/compare/:id")
  .put(isAuthenticatedUser, addCompare)
  .delete(isAuthenticatedUser, deleteCompare);
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
router
  .route("/admin/reviews")
  .get(isAuthenticatedUser, isAuthorizeRoles("admin"), getAllReviews)
  .put(isAuthenticatedUser, isAuthorizeRoles("admin"), feedBack)
  .delete(isAuthenticatedUser, isAuthorizeRoles("admin"), deleteReviews);
router.route("/product/:id").get(getProductDetails);
router.route("/review").put(isAuthenticatedUser, createProductReviews);
router
  .route("/reviews")
  .get(getProductReviews)
  .delete(isAuthenticatedUser, isAuthorizeRoles("admin"), deleteReview);

module.exports = router;
