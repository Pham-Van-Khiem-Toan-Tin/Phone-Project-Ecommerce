const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");

require("dotenv").config();
const app = express();

const PORT = process.env.PORT || 8888;

app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../frontend/build')));

app.get("/", (req, res) => {
  res.send("This is shop app");
});

app.listen(PORT, () => {
  console.log("This app connected to sever by using locallhost: " + PORT);
});
