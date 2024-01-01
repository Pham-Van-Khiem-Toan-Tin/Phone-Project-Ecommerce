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
    today_sales: {
      type: Number,
      default: 0,
      required: true,
    },
    weekly_sales: {
        type: Number,
        default: 0,
        required: true
    },
    monthly_sales: {
        type: Number,
        default: 0,
        required: true
    },
    today_revenue: {
      type: Number,
      default: 0,
      required: true,
    },
    weekly_revenue: {
        type: Number,
        default: 0,
        required: true
    },
    monthly_revenue: {
        type: Number,
        default: 0,
        required: true
    },
    in_escrow: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const saleModel = mongoose.model("sales", saleSchema);
module.exports = saleModel;
