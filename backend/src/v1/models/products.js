const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.ObjectId;
const productSchema = new mongoose.Schema(
  {
    pName: {
      type: String,
      required: [true, "Please enter productName"],
    },
    pDescription: {
      type: String,
      required: [true, "Pl;ease enter productDescription"],
    },
    pPrice: {
      type: Number,
      required: [true, "Please enter productPrice"],
    },
    pImages: [
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
    pRating: {
      type: Number,
      default: 0,
    },

    pCategory: {
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
    pReview: [
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
    pStatus: {
      type: String,
      required: true,
    },
    pDiscount: {
      type: Number,
      default: null,
    },
  },
  { timestamps: true }
);

const productModel = mongoose.model("products", productSchema);
module.exports = productModel;
