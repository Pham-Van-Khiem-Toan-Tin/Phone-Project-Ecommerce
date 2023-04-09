const express = require("express");
const {
  register,
  loginUser,
  logout,
  forgotPassword,
  resetPassword,
  getUserDetails,
  updatePassword,
  updateProfile,
  getAllUser,
  getSingleUser,
  updateUserRole,
  deleteUser,
} = require("../controllers/userController");

const {
  isAuthenticatedUser,
  isAuthorizeRoles,
} = require("../middlewares/auth");

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(loginUser);
router.route("/reload").post();
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/logout").get(logout);
router.route("/me").post(isAuthenticatedUser, getUserDetails);
router.route("/password/update").put(isAuthenticatedUser, updatePassword);
router.route("/me/update").put(isAuthenticatedUser, updateProfile);

router
  .route("/admin/users")
  .get(isAuthenticatedUser, isAuthorizeRoles("admin"), getAllUser);
router
  .route("/admin/user/:id")
  .get(isAuthenticatedUser, isAuthorizeRoles("admin"), getSingleUser)
  .put(isAuthenticatedUser, isAuthorizeRoles("admin"), updateUserRole)
  .delete(isAuthenticatedUser, isAuthorizeRoles("admin"), deleteUser);

module.exports = router;
