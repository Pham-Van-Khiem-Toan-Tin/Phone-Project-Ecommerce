const express = require("express");
const {
  isAuthenticatedUser,
  isAuthorizeRoles,
} = require("../middlewares/auth");
const { getAllColor, createColor, updateColor } = require("../controllers/color.Controller");
const router = express.Router();
router
  .route("/admin/color")
  .get(isAuthenticatedUser, isAuthorizeRoles("admin"), getAllColor)
  .post(isAuthenticatedUser, isAuthorizeRoles("admin"), createColor)
  .put(isAuthenticatedUser, isAuthorizeRoles("admin"), updateColor);

module.exports = router;
