const userModel = require("../models/users");
require("dotenv").config();
const sendToken = async (user, status, res) => {
  const accessToken = await user.getAccessToken();
  const refeshToken = await user.getRefeshToken();
  //options cookie
  const optionRefeshToken = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    // sameSite: "none",
    secure: true,
    httpOnly: true,
    domain: '.phone-app-huster.netlify.app'
  };
  res
    .status(status)
    .cookie(`refeshToken`, refeshToken, optionRefeshToken)
    .json({
      success: true,
      role: user.role,
      user,
      accessToken: accessToken,
    });
};

module.exports = sendToken;
