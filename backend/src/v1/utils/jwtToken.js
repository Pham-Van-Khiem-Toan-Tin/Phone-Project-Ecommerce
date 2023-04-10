const userModel = require("../models/users");
require("dotenv").config();
const sendToken = async (user, status, res) => {
  const accessToken = await user.getAccessToken();
  const refeshToken = await user.getRefeshToken();
  //options cookie
  console.log(refeshToken);
  const optionRefeshToken = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  const optionAccessToken= {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: false,
  };
  res.status(status).cookie(`refeshToken`, refeshToken, optionRefeshToken).cookie(`accessToken`, accessToken, optionAccessToken).json({
    success: true,
    user,
    accessToken: accessToken,
  });
};

module.exports = sendToken;
