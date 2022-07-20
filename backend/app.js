const connect = require("./src/configs/db");
const cloudinary = require("cloudinary");
require("dotenv").config();

const app = require("./sever");
const PORT = process.env.PORT || 8888;
connect();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.get("/", (req, res) => {
  res.send("This is shop app");
});

app.listen(PORT, () => {
  console.log("This app connected to sever by using locallhost: " + PORT);
});
