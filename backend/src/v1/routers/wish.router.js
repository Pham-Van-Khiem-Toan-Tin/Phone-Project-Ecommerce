const express = require("express");
const {
    isAuthenticatedUser,
    isAuthorizeRoles,
  } = require("../middlewares/auth");
const { getProductInWish, deleteProductWish } = require("../controllers/wish.Controller");
const router = express.Router();


router.route("/wish").get(isAuthenticatedUser,getProductInWish)
router.route("/wish/:id").delete(isAuthenticatedUser, deleteProductWish);

module.exports = router;