const jwt = require("jsonwebtoken");
const userModel = require("../models/users");
const ErrorHandle = require("../utils/errorHandle");
const { refeshToken } = require("../controllers/userController");
require("dotenv").config();

module.exports.isAuthenticatedUser = async (req, res, next) => {
  const accessToken = req.headers.authorization.split(" ")[1];
  if (!accessToken) {
    return next(new ErrorHandle("Please login to access this resource"));
  } else {
    try {
      const decodeData = await jwt.verify(
        accessToken,
        process.env.ACESSTOKEN_SECRET
      );
      req.user = decodeData.id;
      req.role = decodeData.role;
      next();
    } catch (error) {
      const { refeshToken } = req.cookies;
      if (refeshToken) {
        try {
          const decoded = await jwt.verify(
            refeshToken,
            process.env.REFESHTOKEN_SECRET
          );
          console.log(decoded);
          const newAccessToken = jwt.sign({id: decoded.id}, process.env.ACESSTOKEN_SECRET, {expiresIn: process.env.ACESSTOKEN_EXPIRES});
          req.token = newAccessToken;
          req.user = decoded.id;
          req.role = decoded.role;
          next();
        } catch (error) {
          return next(new ErrorHandle("login expired!"));
        }
      } else {
        return next(new ErrorHandle("Invalid Token", 400));
      }
    }
  }
};

module.exports.isAuthorizeRoles = (...roles) => {
  return (req, res, next) => {
    console.log(req.user);
    if (!roles.includes(req.role)) {
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
