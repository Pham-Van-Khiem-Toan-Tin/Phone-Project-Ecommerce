const express = require("express");
const {
  newOrder,
  getAllOrders,
  getSingleOrder,
  myOrders,
  updateOrder,
  deleteOrder,
} = require("../controllers/order.Controller");
const {
  isAuthenticatedUser,
  isAuthorizeRoles,
} = require("../middlewares/auth");
const router = express.Router();

router.route("/order/new").post(isAuthenticatedUser, newOrder);
router.route("/order/:id").get(isAuthenticatedUser, getSingleOrder);
router.route("/orders/me").get(isAuthenticatedUser, myOrders);
router
  .route("/admin/orders")
  .get(isAuthenticatedUser, isAuthorizeRoles("admin"), getAllOrders);
router
  .route("/admin/order/:id")
  .put(isAuthenticatedUser, isAuthorizeRoles("admin"), updateOrder)
  .delete(isAuthenticatedUser, isAuthorizeRoles("admin"), deleteOrder);

module.exports = router;
