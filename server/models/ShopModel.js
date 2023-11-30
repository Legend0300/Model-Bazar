const mongoose = require('mongoose');

// Define Stall Category Schema
const stallCategorySchema = new mongoose.Schema({
    edible: {
        type: Boolean,
        required: true
    },
    name: {
        type: String,
        required: true
    }
});

// Define Shop Type Schema
const shopTypeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});

// Define Income Category Schema
const incomeCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});

// Define Shop Schema
const shopSchema = new mongoose.Schema({
    stallID: {
        type: String,
        required: true
    },
    stallCode: {
        type: String,
        required: true
    },
    stallCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'StallCategory',
    },
    shopType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ShopType',
        required: true
    },
    incomeCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'IncomeCategory',
    },
    valant : {
        type: Boolean,
        default: true
    },
    bazar: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bazar',
        required: true
    },
    size: {
        type: String,
        enum: ['4*5', '10*10'],
        required: true
    },
});

// Define models
const StallCategory = mongoose.model('StallCategory', stallCategorySchema);
const ShopType = mongoose.model('ShopType', shopTypeSchema);
const IncomeCategory = mongoose.model('IncomeCategory', incomeCategorySchema);
const Shop = mongoose.model('Shop', shopSchema);

module.exports = {
    StallCategory,
    ShopType,
    IncomeCategory,
    Shop
};
