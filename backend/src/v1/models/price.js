const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.ObjectId;
const productSchema = new mongoose.Schema(
  {
    product_id: {
        type: ObjectId,
        ref: "products",
    },
    price: {
      type: Number,
      required: [true, "Please enter productPrice"],
    },
    start_date: {
        type: Date,
        required: true
    },
    end_date: {
        type: Date,
        required: true
    }
  },
  { timestamps: true }
);

const priceModel = mongoose.model("prices", priceSchema);
module.exports = priceModel;
