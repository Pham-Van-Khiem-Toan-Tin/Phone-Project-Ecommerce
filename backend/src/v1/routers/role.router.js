const express = require("express");




const {
    isAuthenticatedUser,
    isAuthorizeRoles,
  } = require("../middlewares/auth");
const { getRoleList, editRoleList } = require("../controllers/role.controller");

const router = express.Router();
router.route("/admin/role").get(isAuthenticatedUser, isAuthorizeRoles("admin"), getRoleList)
.put(isAuthenticatedUser, isAuthorizeRoles("admin"), editRoleList);

module.exports = router;