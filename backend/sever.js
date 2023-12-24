const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const helmet = require("helmet");
const fileUpLoad = require("express-fileupload");
const erorMiddleware = require("./src/v1/middlewares/error");
require("dotenv").config();
const app = express();


const user = require("./src/v1/routers/userRouter");
const product = require("./src/v1/routers/productRouter");
const order = require("./src/v1/routers/orderRouter");
const cart = require("./src/v1/routers/cartRouter");
const payment = require("./src/v1/routers/paymentRouter");
app.use(helmet());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "10mb" }));
app.use(fileUpLoad());
// app.use(express.static(path.join(__dirname, "../frontend/public")));

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    exposedHeaders: ["set-cookie"],
  })
);
app.set("trust proxy", 1);

app.use("/api/v1", user);
app.use("/api/v1", product);
app.use("/api/v1", order);
app.use("/api/v1", cart);
app.use("/api/v1", payment);
app.use(erorMiddleware);

module.exports = app;
