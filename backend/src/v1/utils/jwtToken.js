const userModel = require("../models/users");
require("dotenv").config();
const sendToken = async (user, status, res) => {
  const accessToken = await user.getAccessToken();
  const refreshToken = await user.getRefreshToken();
  //options cookie
  const optionRefreshToken = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    secure: true,
    httpOnly: true,
    // sameSite: 'lax',
    // domain: 'phone-app-huster.netlify.app',
  };
  res
    .status(status)
    .cookie(`refeshToken`, refreshToken, optionRefreshToken)
    .json({
      success: true,
      role: user.role,
      user,
      accessToken: accessToken,
    });
};

module.exports = sendToken;
