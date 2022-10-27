const mongoose = require("mongoose");
require("dotenv").config();
const connect = () => {
  mongoose
    .connect(process.env.DATABASE)
    .then(() => {
      console.log("Connnected to database successfully");
    })
    .catch((err) => {
      console.log("Connect to database faill \n" + err);
    });
};

module.exports = connect;
