const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.ObjectId;
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter productName"],
    },
    description: {
      type: String,
      required: [true, "Pl;ease enter productDescription"],
    },
    price: {
      type: Number,
      required: [true, "Please enter productPrice"],
    },
    images: [
      {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
    ratings: {
      type: Number,
      default: 5,
    },
    category: {
      type: String,
      required: [true, "Please Enter Product Category"],
    },
    stock: {
      type: Number,
      required: [true, "Please Enter Product Stock"],
      maxLength: [4, "Stock cannot exceed 4 characters"],
      default: 1,
    },
    numOfReview: {
      type: Number,
      default: 0,
    },
    reviews: [
      {
        user: {
          type: ObjectId,
          ref: "users",
          
        },
        name: {
          type: String,
          
        },
        rating: {
          type: Number,
          
        },
        comments: {
          type: String,
          
        },
      },
    ],
  },
  { timestamps: true }
);

const productModel = mongoose.model("products", productSchema);
module.exports = productModel;
