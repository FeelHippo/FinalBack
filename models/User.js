'use strict';

const mongoose = require('mongoose');
const nodemailer = require('nodemailer');

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        unique: true,
    },
    email: {
        type: String,
        unique: true
    },
    password: String,
});

// nodeMailer method
UserSchema.methods.sendEmail = async function(from, subject, body) {
    // create transporter
    const transporter = nodemailer.createTransport({
        service: process.env.EMAIL_SERVICE, 
        auth: {
            user: process.env.EMAIL_SERVICE_USER,
            pass: process.env.EMAIL_SERVICE_PASS,
        }
    })

    //send email, async operation
    await transporter.sendMail({
        from: from,
        to: this.email,
        subject: subject,
        html: body,
    })
}

const User = mongoose.model('User', UserSchema);

module.exports = User;