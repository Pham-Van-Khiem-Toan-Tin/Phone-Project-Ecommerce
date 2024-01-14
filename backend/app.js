const connect = require("./src/configs/db");
const cloudinary = require("cloudinary");
const { Server } = require("socket.io");
const { createServer } = require("node:http");
require("dotenv").config();

const app = require("./sever");
const PORT = process.env.PORT || 8888;
connect();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT"],
  },
});
app.get("/", (req, res) => {
  res.send("This is shop app");
});
io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});
server.listen(8000, () => {
  console.log("server running at http://localhost:8888");
});

// app.listen(PORT, () => {
//   console.log("This app connected to sever by using locallhost: " + PORT);
// });
