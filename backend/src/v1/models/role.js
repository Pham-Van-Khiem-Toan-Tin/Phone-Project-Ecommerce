const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.ObjectId;

const roleSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    functions: {
        type: [String],
    },
    order: {
        type: Number,
        required: true
    }
}, {timestamps: true});

const roleModel = mongoose.model("roles", roleSchema);
module.exports = roleModel;