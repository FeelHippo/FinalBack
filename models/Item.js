'use strict';

const mongoose = require('mongoose');

// define schema
const ItemSchema = mongoose.Schema({
    tags: [String],
    name: String,
    price: Number,
    description: String,
    photo: String,
    type: Boolean,
});

// create model
const Item = mongoose.model('Item', ItemSchema);

module.exports = Item;