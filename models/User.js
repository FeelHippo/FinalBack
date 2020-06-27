'use strict';

const mongoose = require('mongoose');

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

const User = mongoose.model('User', UserSchema);

module.exports = User;