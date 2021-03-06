const jwt = require("jsonwebtoken");
const userModel = require("../models/users");
const ErrorHandle = require("../utils/errorHandle");
require("dotenv").config();

module.exports.isAuthenticatedUser = async (req, res, next) => {
  const {token} = req.cookies;
  if(!token) {
    return next(new ErrorHandle("Please login to access this resource"));
  }
  const decodeData = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await userModel.findById(decodeData.id);
  next();
};

module.exports.isAuthorizeRoles =  (...roles) => {
  return (req, res, next) => {
    if(!roles.includes(req.user.role)) {
        return next(
          new ErrorHandle(`Role: ${req.user.role} is not allowed to access this resource`, 403)
        ) 
    }
    next();
  }
};
