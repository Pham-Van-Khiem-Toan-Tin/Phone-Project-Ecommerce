const jwt = require("jsonwebtoken");
const userModel = require("../models/users");
const ErrorHandle = require("../utils/errorHandle");
require("dotenv").config();

module.exports.isAuthenticatedUser = async (req, res, next) => {
  const { token } = req.cookies;
  const { accessToken } = req.body;
  console.log(req.body);
  if (!accessToken) {
    return next(new ErrorHandle("Please login to access this resource"));
  } else {
    const decodeData = await jwt.verify(
      accessToken,
      process.env.ACESSTOKEN_SECRET
    );
    if (decodeData) {
      req.user = await userModel.findById(decodeData.id);
      next();
    } else {
      res.json({
        verifyToken: false,
        success: false,
      });
    }
  }
};

module.exports.isAuthorizeRoles = (...roles) => {
  return (req, res, next) => {
    console.log(req.user);
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandle(
          `Role: ${req.user.role} is not allowed to access this resource`,
          403
        )
      );
    }
    next();
  };
};

module.exports.generateToken = async (data, secret, expires) => {
  return await jwt.sign(data, secret, { expiresIn: expires });
};
