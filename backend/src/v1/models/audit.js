const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.ObjectId;
const auditSchema = new mongoose.Schema({
    user_name: {
        type: String,
        required: true
    },
    ip_address: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    product_id: {
        type: ObjectId,
        ref: "products"
    },
    created_by: {
        type: String,
        required: true
    }
}, {timestamps: true});

const auditModel = mongoose.model("audit", auditSchema);
module.exports = auditModel;