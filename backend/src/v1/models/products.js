const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.ObjectId;
const productSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      required: [true, "Please enter productName"],
    },
    Description: {
      type: String,
      required: [true, "Pl;ease enter productDescription"],
    },
    Price: {
      type: Number,
      required: [true, "Please enter productPrice"],
    },
    Images: [
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
    Rating: {
      type: Number,
      default: 0,
    },

    Category: {
      type: String,
      required: [true, "Please Enter Product Category"],
    },
    Stock: {
      type: Number,
      required: [true, "Please Enter Product Stock"],
      maxLength: [4, "Stock cannot exceed 4 characters"],
      default: 1,
    },
    numOfReview: {
      type: Number,
      default: 0,
    },
    Review: [
      {
        user: {
          type: ObjectId,
          ref: "users",
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        rating: {
          type: Number,
          required: true,
        },
        comments: {
          type: String,
          required: true,
        },
        createAt: {
          type: Date,
          default: Date.now(),
        },
      },
    ],
    user: {
        type: ObjectId,
        ref: "users",
        required: true
    },
    Status: {
      type: String,
      required: true,
    },
    Discount: {
      type: Number,
      default: null,
    },
  },
  { timestamps: true }
);

const productModel = mongoose.model("products", productSchema);
module.exports = productModel;
