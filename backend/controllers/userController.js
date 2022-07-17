const mongoose = require("mongoose");
const userModel = require("../models/users");
const crypto = require("crypto");
const sendToken = require("../utils/jwtToken");

