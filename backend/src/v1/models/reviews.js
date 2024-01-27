const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.ObjectId;

const reviewSchema = new mongoose.Schema({
  user_id: {
    type: ObjectId,
    ref: "users",
    required: true,
  },
  product_id: {
    type: ObjectId,
    ref: "products",
    required: true,
  },
  name: {
    type: String,
  },
  rating: {
    type: Number,
  },
  comment: {
    type: String,
  },
  feed_back: {
    type: String,
  }
}, {timestamps: true});

const reviewModel = mongoose.model("reviews", reviewSchema);
module.exports = reviewModel;