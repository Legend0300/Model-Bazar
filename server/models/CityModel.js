const mongoose = require('mongoose');

const citySchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    district: {
        type: String,
        required: true
    },
    province: {
        type: String,
        required: true
    },
    zone : {
        type:  mongoose.Schema.Types.ObjectId,
        ref: 'Zone'
    },
    prefix: {
        type: String,
        required: true
    }
});

const CityModel = mongoose.model('City', citySchema);

module.exports = CityModel;
