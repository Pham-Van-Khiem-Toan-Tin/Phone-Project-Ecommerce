const mongoose = require("mongoose");

const colorSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    hex: {
        type: String,
        required: true
    },
}, {timestamps: true});

const colorModel = mongoose.model("colors", colorSchema);
module.exports = colorModel;