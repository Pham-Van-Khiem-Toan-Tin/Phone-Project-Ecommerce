const express = require("express");
const { getProductInCart, deleteProductCart } = require("../controllers/cartController");
const {
    isAuthenticatedUser,
    isAuthorizeRoles,
  } = require("../middlewares/auth");
const router = express.Router();


router.route("/cart").get(isAuthenticatedUser,getProductInCart)
router.route("/cart/:id").delete(isAuthenticatedUser, deleteProductCart);

module.exports = router;