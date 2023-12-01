const mongoose = require('mongoose');

const shopAllotmentSchema = new mongoose.Schema({
    TxID: { type: String, required: true, unique: true },
    AllotmentDate: { type: Date, default: Date.now },
    Shop: { type: mongoose.Schema.Types.ObjectId, ref: 'Shop', required: true },
    shopholder: { type: mongoose.Schema.Types.ObjectId, ref: 'ShopHolder', required: true }, // Assuming there is a 'ShopHolder' model
    Rent: { type: Number, required: true },
    FacePicture: { type: String, required: true },
    CNICFrontPicture: { type: String, required: true },
    CNICBackPicture: { type: String, required: true },
    ApprovedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Assuming there is a 'ZoneManager' model
    AllotedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Assuming there is a 'ZoneManager' model
    Status: { type: String, enum: ['verified', 'not_verified'], default: 'not_verified' },
    StartDate: { type: Date, required: true },
    EndDate: { type: Date, required: true },
    PaidSecurityVCHR: { type: Number },
});

const ShopAllotment = mongoose.model('ShopAllotment', shopAllotmentSchema);

module.exports = ShopAllotment;