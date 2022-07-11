const  mongoose  = require("mongoose");
const validator = require('validator');
const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, 'Please enter your user name']
    },
    name: {
        type: String,
        maxLength: 32,
        required: [true, 'Please enter your name']
    },
    email: {
        type: String,
        unique: true,
        Validate: [validator.isEmail, 'Please enter valid email'],
        required: [true, 'Please enter your email'],
    },
    password: {
        type: String,
        required: true,
        minLength: [8, 'Password should be greater than 8 characters'],
        select: false 
    },
    avatar: {
        public_id: {
            type: String,
            required: true
        },
        urlAvatar: {
            type: String,
            required: true
        }
    },
    role: {
        type: String,
        default: 'user'
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
}, {timestamps: true});



const userModel = mongoose.model('users', userSchema);
module.exports = userModel;

