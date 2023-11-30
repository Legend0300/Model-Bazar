const mongoose = require('mongoose');

const shopAllotmentSchema = new mongoose.Schema({
    Allotment_ID: { type: String, required: true, unique: true },
    bazar: { type: mongoose.Schema.Types.ObjectId, ref: 'Bazar', required: true }, // Assuming there is a 'Bazar' model
    shopholder: { type: mongoose.Schema.Types.ObjectId, ref: 'ShopHolder', required: true }, // Assuming there is a 'ShopHolder' model
    AllotmentDate: { type: Date, default: Date.now },
    VerifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Zone Manager', required: true }, // Assuming there is a 'ZoneManager' model
    Status: { type: String, enum: ['verified', 'not_verified'], default: 'not_verified' }
});

const ShopAllotment = mongoose.model('ShopAllotment', shopAllotmentSchema);

module.exports = ShopAllotment;