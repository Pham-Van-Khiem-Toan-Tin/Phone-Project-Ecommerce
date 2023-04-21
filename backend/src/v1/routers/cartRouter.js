const express = require("express");
const { getProductInCart } = require("../controllers/cartController");
const {
    isAuthenticatedUser,
    isAuthorizeRoles,
  } = require("../middlewares/auth");
const router = express.Router();


router.route("/cart").get(isAuthenticatedUser,getProductInCart);

module.exports = router;