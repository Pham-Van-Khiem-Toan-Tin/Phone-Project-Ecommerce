const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const helmet = require("helmet");

require("dotenv").config();
const app = express();

const user = require("./src/v1/routers/userRouter");
const product = require("./src/v1/routers/productRouter");


app.use(helmet());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../frontend/build")));
app.use(cors({ origin: `${process.env.CLIENT_URL}` }));


app.use("/api/v1", user);
app.use("/api/v1", product);
module.exports = app;
