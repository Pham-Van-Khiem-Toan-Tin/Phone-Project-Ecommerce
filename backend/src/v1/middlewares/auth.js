const jwt = require("jsonwebtoken");
const userModel = require("../models/users");
const ErrorHandle = require("../utils/errorHandle");
require("dotenv").config();

module.exports.isAuthenticatedUser = async (req, res, next) => {
<<<<<<< HEAD
  const { accessToken } = req.body;
  console.log(req.body);
  if (!accessToken) {
=======
  const {refeshToken} = req.cookies;
  console.log(req.cookies);
  if(!refeshToken) {
>>>>>>> c17094c894dc9b4745fe69861ed2f6cd1bfe3025
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
<<<<<<< HEAD
=======
  const decodeData = jwt.verify(refeshToken, process.env.REFESHTOKEN_SECRET);
  req.user = await userModel.findById(decodeData.id);
  next();
>>>>>>> c17094c894dc9b4745fe69861ed2f6cd1bfe3025
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
<<<<<<< HEAD

module.exports.generateToken = async (data, secret, expires) => {
  return await jwt.sign(data, secret, { expiresIn: expires });
};
=======
>>>>>>> c17094c894dc9b4745fe69861ed2f6cd1bfe3025
