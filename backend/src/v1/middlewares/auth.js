const jwt = require("jsonwebtoken");
const userModel = require("../models/users");
const ErrorHandle = require("../utils/errorHandle");
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
      console.log(accessToken);
      req.user = decodeData.id;
      req.role = decodeData.role;
      req.name = decodeData.name;
      next();
    } catch (error) {
      const { refeshToken } = req.cookies;
      if (refeshToken) {
        try {
          const decoded = await jwt.verify(
            refeshToken,
            process.env.REFESHTOKEN_SECRET
          );
          const newAccessToken = jwt.sign(
            { id: decoded.id, role: decoded.role},
            process.env.ACESSTOKEN_SECRET,
            { expiresIn: process.env.ACESSTOKEN_EXPIRES }
          );
          req.token = newAccessToken;
          req.user = decoded.id;
          req.role = decoded.role;
          req.name = decoded.name;
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
    if (!roles.includes(req.role)) {
      return next(
        new ErrorHandle(`Role: You is not allowed to access this resource`, 403)
      );
    }
    next();
  };
};


