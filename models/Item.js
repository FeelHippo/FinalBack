'use strict';

const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const { options } = require('../routes');

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
    favorite: [{ type: String }],
});

ItemSchema.methods.sendEmail = async function(options) {
    // define transporter
    const transporter = nodemailer.createTransport({
        // production settings
        // service: process.env.EMAIL_SERVICE, 
        // auth: {
        //     user: process.env.EMAIL_SERVICE_USER,
        //     pass: process.env.EMAIL_SERVICE_PASS,
        // }
        // development settings
        host: process.env.MAILTRAP_HOST,
        port: process.env.MAILTRAP_PORT,
        auth: {
            user: process.env.MAILTRAP_USERNAME,
            pass: process.env.MAILTRAP_PASSWORD,
        }
    })

    await transporter.sendMail(options);
}

// create model
const Item = mongoose.model('Item', ItemSchema);

module.exports = Item;