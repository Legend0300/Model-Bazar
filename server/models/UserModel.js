const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
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
    phone: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['disabled', 'not active', 'active'],
        default: 'not active'
    },
    userType: {
        type: String,
        enum: ['SuperAdmin', 'Admin', 'Zone Manager', 'Supervisor', 'Bazar Manager'],
        required: true
    }
});

const User = mongoose.model('User', userModel);

module.exports = User;
