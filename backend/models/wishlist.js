const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.ObjectId;

const wishListSchema = new mongoose.Schema({
    user: {
        wId: {
            type: ObjectId,
            ref: 'users',
        },
        wProduct: [
            {
                id_product: {
                    type: ObjectId,
                    ref: 'products'
                }
            }
        ]
    }
})