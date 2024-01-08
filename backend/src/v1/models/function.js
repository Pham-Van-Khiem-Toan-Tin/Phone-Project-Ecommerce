const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.ObjectId;

const functionSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    sub_function: [
        {
            id: {
                type: String,
                required: true
            },
            description: {
                type: String,
                required: true
            },
            order: {
                type: Number,
                required: true
            },
            authorities: [
                {
                    id: {
                        type: String,
                        required: true
                    },
                    description: {
                        type: String,
                        required: true
                    }
                }
            ]
        }
    ],
    
});

const functionModel = mongoose.model("functions", functionSchema);
module.exports = functionModel;