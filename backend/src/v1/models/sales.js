const mongoose = require("mongoose");
const validator = require("validator");
const ObjectId = mongoose.Schema.ObjectId;
require("dotenv").config();

const saleSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    sales: {
      day: {
        type: Number,
        default: 0,
        required: true,
      },
      week: {
        type: Number,
        default: 0,
        required: true,
      },
      month: {
        type: Number,
        default: 0,
        required: true,
      },
    },
    revenue: {
      day: {
        type: Number,
        default: 0,
        required: true,
      },
      week: {
        type: Number,
        default: 0,
        required: true,
      },
      month: {
        type: Number,
        default: 0,
        required: true,
      },
    },
    orders: {
      day: {
        type: Number,
        default: 0,
        required: true,
      },
      week: {
        type: Number,
        default: 0,
        required: true,
      },
      month: {
        type: Number,
        default: 0,
        required: true,
      },
    },
    seller: {
      day: [
        {
          product_id: {
            type: ObjectId,
            ref: "products",
          },
          sales: {
            type: Number,
            default: 0,
            required: true,
          },
        },
      ],
      week: [
        {
          product_id: {
            type: ObjectId,
            ref: "products",
          },
          sales: {
            type: Number,
            default: 0,
            required: true,
          },
        },
      ],
      month: [
        {
          product_id: {
            type: ObjectId,
            ref: "products",
            required: true,
          },
          sales: {
            type: Number,
            default: 0,
            required: true,
          },
        },
      ],
    },
  },
  { timestamps: true }
);

const saleModel = mongoose.model("sales", saleSchema);
module.exports = saleModel;
