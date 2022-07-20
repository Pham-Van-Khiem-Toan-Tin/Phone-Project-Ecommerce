const connect = require("./src/configs/db");
require("dotenv").config();

const app = require("./sever");
const PORT = process.env.PORT || 8888;
connect();

app.get("/", (req, res) => {
  res.send("This is shop app");
});

app.listen(PORT, () => {
  console.log("This app connected to sever by using locallhost: " + PORT);
});
