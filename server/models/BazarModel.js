const mongoose = require('mongoose');

const BazarSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        default: false
    },
    baseRentPermanent: {
        type: Number,
        required: true
    },
    numberOfPermanentShops: {
        type: Number,
        required: true
    },
    baseRentTemporary: {
        type: Number,
        required: true
    },
    numberOfTemporaryShops: {
        type: Number,
        required: true
    },
    image: {
        type: String
    },
    zoneManager: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    bazarManager: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

const BazarModel = mongoose.model('Bazar', BazarSchema);

module.exports = BazarModel;
