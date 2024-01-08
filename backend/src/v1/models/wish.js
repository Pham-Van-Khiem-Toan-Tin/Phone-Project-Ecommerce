const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.ObjectId;

const wishSchema = new mongoose.Schema({
  user_id: {
    type: ObjectId,
    ref: "user",
    required: true,
  },
  item: {
    type: [
      {
        product_id: {
          type: ObjectId,
          ref: "products",
          required: true,
        },
      },
    ],
  },
}, {timestamps: true});

const wishModel = mongoose.model("wish", wishSchema);
module.exports = wishModel;