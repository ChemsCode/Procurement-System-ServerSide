const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemRequestSchema = new Schema({
    itemName: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('ItemRequest', itemRequestSchema);