require("dotenv").config();
const sendToken = (user, status, res) => {
  const token = user.getJWTToken();

  //options cookie
  const option = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httponly: true,
  };

  res.status(status).cookie("token", token, option).json({
    success: true,
    user,
    token,
  });
};

module.exports = sendToken;
