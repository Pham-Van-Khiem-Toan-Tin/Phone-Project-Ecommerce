const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.ObjectId;

const wishSchema = new mongoose.Schema(
  {
    products: [
      {
        product_id: {
          type: ObjectId,
          ref: "products",
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

const wishModel = mongoose.model("wishs", wishSchema);
module.exports = wishModel;
