const mongoose = require('mongoose');

const voucherSchema = new mongoose.Schema({
    Voucher_ID: { type: String, required: true, unique: true },
    Description: { type: String, required: true },
    Amount: { type: Number, required: true },
    Type: { type: String, enum: ['rent', 'electricity'], required: true },
    DateGenerated: { type: Date, default: Date.now },
    Status: { type: String, enum: ['redeemed', 'not_redeemed'], default: 'not_redeemed' }
});

const Voucher = mongoose.model('Voucher', voucherSchema);

module.exports = Voucher;