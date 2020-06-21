'use strict';

const mongoose = require('mongoose');

// define schema
const ItemSchema = mongoose.Schema({
    name: String,
    price: Number,
    sell: Boolean,
    picture: String,
    tags: [String],
});

// create model
const Item = mongoose.model('Item', ItemSchema);

module.exports = Item;