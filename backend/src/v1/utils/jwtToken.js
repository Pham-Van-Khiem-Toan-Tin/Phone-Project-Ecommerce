require("dotenv").config();
const sendToken = (user, status, res) => {
  const token = user.getJWTToken();

  //options cookie
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  res.status(status).cookie(`token`, token, options).json({
    success: true,
    user,
    token,
  });
};

module.exports = sendToken;
