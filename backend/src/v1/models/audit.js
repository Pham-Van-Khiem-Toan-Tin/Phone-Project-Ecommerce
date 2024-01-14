const mongoose = require("mongoose");

const auditSchema = new mongoose.Schema({
    user_name: {
        type: String,
        required: true
    },
    ip_address: {
        type: String,
        required: true
    },
    action_type: {
        type: String,
        required: true
    },
    sub_function_type: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    affected_table: {
        type: String,
        required: true
    },
    old_value: {
        type: String,
        required: true
    },
    new_value: {
        type: String,
        required: true
    },
    modified_by: {
        type: String,
        required: true
    },
    created_by: {
        type: String,
        required: true
    }
}, {timestamps: true});

const auditModel = mongoose.model("audit", auditSchema);
module.exports = auditModel;