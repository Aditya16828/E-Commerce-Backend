const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const {SALT_ROUNDS} = require('../config/serverConfig');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String, 
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        unique: true,
        required: true
    },
    deliveryAddress: {
        type: String,
        required: true
    },
    cart: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }],
    orders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }],
    // feedbacks: [{type: mongoose.Schema.Types.ObjectId,ref: 'Feedback'}]
}, {timestamps: true});

userSchema.pre('save', function (next) {
    let user = this;
    const salt = bcrypt.genSaltSync(parseInt(SALT_ROUNDS));
    const encryptedPassword = bcrypt.hashSync(user.password, salt);
    user.password = encryptedPassword;
    next();
})

const User = mongoose.model('User', userSchema);

module.exports = User;