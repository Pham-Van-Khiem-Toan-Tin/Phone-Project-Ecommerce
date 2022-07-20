const ErrorHandle = require("../utils/errorHandle");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal sever error";

  //Wrong mongodb Id error
  if (err.name === "castError") {
    const message = `Resource not found. Invalid: ${err.path}`;
    err = new ErrorHandle(message, 400);
  }

  //Mongodb dublicate key error
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.Value)} Entered`;
    err = new ErrorHandle(message, 400);
  }

  //Wrong JWT error
  if (err.name === "JsonWebTokenError") {
    const message = "Json Web Token is valid, Try again";
    err = new ErrorHandle(message, 400);
  }

  //JWT EXPIRE error
  if (err.name === "TokenExpiredError") {
    const message = `Json Web Token is Expired, Try again`;
    err = new ErrorHandle(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
