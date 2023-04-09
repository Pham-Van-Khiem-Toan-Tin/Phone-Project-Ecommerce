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
<<<<<<< HEAD
  res.status(status).cookie(`refeshToken`, refeshToken, optionRefeshToken).json({
=======
  res.status(status).cookie('refeshToken', refeshToken, optionRefeshToken).json({
>>>>>>> c17094c894dc9b4745fe69861ed2f6cd1bfe3025
    success: true,
    user,
    accessToken: accessToken,
  });
};

module.exports = sendToken;
