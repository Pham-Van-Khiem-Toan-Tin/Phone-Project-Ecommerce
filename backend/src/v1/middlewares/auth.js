const jwt = require("jsonwebtoken");
const errorRquest = require("../../configs/errorRequest");
const userModel = require("../models/users");
require("dotenv").config();

module.exports.isAuthenticatedUser = async (req, res, next) => {
  const {token} = req.cookies;
  if(!token) {
    return res.status(401).json(errorRquest.auth.authenticate);
  }
  const decodeData = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await userModel.findById(decodeData.id);
  next();
};

module.exports.isAuthorizeRoles =  (...roles) => {
  return (req, res, next) => {
    if(!roles.includes(req.user.role)) {
        return res.json({Role: `${req.user.role} is not allowed to access this resouce`})
    }
    next();
  }
};
