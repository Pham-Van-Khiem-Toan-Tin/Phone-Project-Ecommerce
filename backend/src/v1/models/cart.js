const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.ObjectId;

const cartSchema = new mongoose.Schema({
    caProduct: [
      {
        id_product: {
          type: ObjectId,
          ref: "products",
        },
        quantity: {
          type: Number,
        },
      },
    ],
});

const cartModel = mongoose.model('cart', cartSchema);
module.exports = cartModel;
