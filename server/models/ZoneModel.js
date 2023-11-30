const mongoose = require('mongoose');

const zoneSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        default: false
    }
});

const Zone = mongoose.model('Zone', zoneSchema);

module.exports = Zone;
