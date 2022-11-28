const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const purchasedItemSchema = new Schema({
    itemName: {
        type: String,
        required: true
    },
    supplierName: {
        type: String,
        required: true
    },
    price: {
            type: Number,
            required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    companyName:{
        type: String,
        required: true
    },
    buyerName:{
        type: String,
        required: true
    },
    purchaseApproved:{
        type:Boolean,
        required: true
    }
});

module.exports = mongoose.model('PurchasedItem', purchasedItemSchema);