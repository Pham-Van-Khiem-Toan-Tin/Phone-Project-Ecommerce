const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.ObjectId;

const compareSchema = new mongoose.Schema({
  user_id: {
    type: ObjectId,
    ref: "users",
    required: true,
  },
  items: {
    type: [
      {
        product_id: {
          type: ObjectId,
          ref: "products",
          required: true,
        },
      },
    ],
    validate: [
      {
        validator: function (array) {
          // Kiểm tra xem mảng có tồn tại và có độ dài không quá 2 không
          return Array.isArray(array) && array.length <= 2;
        },
        message: "You can only compare 2 products",
      }
    ]
  },
}, {timestamps: true});

const compareModel = mongoose.model("compare", compareSchema);
module.exports = compareModel;