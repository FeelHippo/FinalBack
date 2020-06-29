'use strict';

const mongoose = require('mongoose');

// define schema
const ItemSchema = mongoose.Schema({
    created: { type: Date, default: Date.now },
    creator: String,
    tags: [{ type: String }],
    name: String,
    price: Number,
    description: String,
    photo: String,
    type: Boolean,
    reserved: Boolean,
    sold: Boolean,
});

// create model
const Item = mongoose.model('Item', ItemSchema);

module.exports = Item;