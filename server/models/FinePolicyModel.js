const mongoose = require('mongoose');

const finePolicySchema = new mongoose.Schema({
    FinePolicy_ID: { type: String, required: true, unique: true },
    Description: { type: String, required: true },
    Amount: { type: Number, required: true }
});

const FinePolicy = mongoose.model('FinePolicy', finePolicySchema);

module.exports = FinePolicy;