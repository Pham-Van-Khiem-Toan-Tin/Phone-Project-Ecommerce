const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.ObjectId;

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    parent: {
        type: ObjectId,
        ref: "categories"
    }
}, {timestamps: true});

const categoryModel = mongoose.model("categories", categorySchema);
module.exports = categoryModel;