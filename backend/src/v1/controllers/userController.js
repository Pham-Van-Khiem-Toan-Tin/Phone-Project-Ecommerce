const mongoose = require("mongoose");
const userModel = require("../models/users");
const crypto = require("crypto");
const sendToken = require("../utils/jwtToken");
const cloudinary = require("cloudinary");

class User {
  async Register(req, res) {
    let { name, email, password } = req.body;
    try {
      const myCloud = await cloudinary.v2.uploader(req.body.avatar, {
        folder: "avatar",
        width: 150,
        crop: "scale",
      });
      const newUser = await userModel.create({
        name,
        email,
        password,
        avatar: {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        },
      });
      sendToken(user, 201, res);
    } catch (err) {
      console.log(err);
    }
  }

  async loginUser(req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({ error: "Login failled" });
    } else {
      try {
        const user = userModel.findOne({ email: email }).select("+password");
        if (!user) {
          return res.json({ error: "Invalid email or password" });
        } else {
          const passwordIsMatch = userModel.comparePassword(password);
          if (!passwordIsMatch) {
            return res.json({ error: "Invalid email or password" });
          } else {
            sendToken(user, 200, res);
          }
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  async logOut(req, res, next) {}
}
