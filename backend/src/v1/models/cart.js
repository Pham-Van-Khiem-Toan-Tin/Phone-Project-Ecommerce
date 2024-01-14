const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.ObjectId;

const cartSchema = new mongoose.Schema({
    products: [
      {
        product_id: {
          type: ObjectId,
          ref: "products",
          required: true,
        },
        quantity: {
          type: Number,
        },
      },
    ],
});

const cartModel = mongoose.model('cart', cartSchema);
module.exports = cartModel;
