const userModel = require("../models/users");
const errorRquest = require("../../configs/errorRequest");
const successRequest = require("../../configs/successRquest");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const { toTitleCase } = require("../../configs/titleCase");
const jwt = require("jsonwebtoken");
require("dotenv").config();
class Auth {
  async isAdmin(req, res) {
    let { loginInUserId } = req.body;
    try {
      let loginInUserRole = await userModel.findById(loginInUserId);
      res.json({ role: loginInUserRole.role });
    } catch (err) {
      res.status(400).send(errorRquest.auth.checkIsAdmin);
    }
  }

  async postSignup(req, res) {
    let { name, email, password, cPassword } = req.body;
    if (!name || !email || !password || !cPassword) {
      return res.json(errorRquest.auth.signUp);
    } else if (name.length < 3 || name.length > 25) {
      return res.json(errorRquest.auth.name);
    } else {
      if (validator.isEmail(email)) {
        name = toTitleCase(name);
        if (validator.isLength(password, {min:8, max: 255})) {
          res.json(errorRquest.auth.password);
        } else {
          try {
            password = bcrypt.hashSync(password, 10);
            const data = await userModel.findOne({ email: email });
            if (data) {
              res.json(errorRquest.auth.email.findEmailToSignup);
            } else {
              let newUser = new userModel({
                userName: name,
                email: email,
                password: password,
                role: "user",
              });
              newUser
                .save()
                .then(() => {
                  return res.json(successRequest.signUp);
                })
                .catch((err) => {
                  console.log(err);
                  return res.json(errorRquest.auth.createAccount);
                });
            }
          } catch (err) {
            console.log(err);
          }
        }
      } else {
        return res.json(errorRquest.auth.email.validateEmail);
      }
    }
  }

  async postSignIn(req, res) {
    let { email, password } = req.body;
    if (!email || !password) {
      return res.json(errorRquest.auth.email.validateEmail);
    } else {
      try {
        const data = await userModel.findOne({ email: email });
        if (!data) {
          return res.json(errorRquest.auth.email.findEmailToSignIn);
        } else {
          const login = await bcrypt.compare(password, data.password);
          if (login) {
            const token = jwt.sign(
              {
                _id: data._id,
                role: data.role,
              },
              process.env.JWT_SECRET
            );
            const endcode = jwt.verify(token, process.env.JWT_SECRET);
            return res.json({
              token: token,
              user: endcode,
            });
          } else {
            return res.json(errorRquest.auth.email.findEmailToSignIn);
          }
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
}

const authController = new Auth();
module.exports = authController;
