const userModel = require("../models/users");
require("dotenv").config();
const sendToken = (user, status, res) => {
  const accessToken = user.getAccessToken();
  const refeshToken = user.getRefeshToken();
  //options cookie
  const optionRefeshToken = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  const optionAccessToken = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  }

  res.status(status).cookie(`refeshToken`, refeshToken, optionRefeshToken).cookie(`accessToken`, accessToken, optionAccessToken).json({
    success: true,
    user,
    accessToken,
  });
};

module.exports = sendToken;
