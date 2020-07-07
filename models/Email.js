require('dotenv').config();

module.exports = {
    sold: (to, item) => {
        return {
            from: process.env.ADMIN_EMAIL,
            to: to,
            subject: 'An item you were interested in has been sold',
            text: `Hi there, unfortunately, ${item} has just been sold!`,
            html: '<b>No reason to panic! &#128513</b><br> We have plenty more items on sale'
        } 
    },
    reserved: (to, item) => {
        return {
            from: process.env.ADMIN_EMAIL,
            to: to,
            subject: 'An item you were interested in is now reserved',
            text: `Hi there, ${item} has been reserved, and is not currently available!`,
            html: '<b>No reason to panic! &#128529</b><br> We have plenty more items on sale'
        } 
    },
    priceChanged: (to, item) => {
        return {
            from: process.env.ADMIN_EMAIL,
            to: to,
            subject: 'The price of an item you like in has changed',
            text: `Hi there, ${item} has just been update!`,
            html: '<b>No reason to panic! &#128556</b><br> We have plenty more items on sale'
        } 
    },
    unreadChat: (to, item) => {
        return {
            from: process.env.ADMIN_EMAIL,
            to: to,
            subject: 'Unread Messages!',
            text: `Hi there, it looks like there are some unread messages in your inbox!`,
            html: '<b>No reason to panic! &#128566</b><br> We have plenty more items on sale'
        } 
    },
    password: (password) => {
        return {
            from: process.env.ADMIN_EMAIL,
            to: to,
            subject: 'Your Password',
            text: `Hi there, this is to remind you that your password is ${password}!`,
            html: '<b>Hey Buddy! &#128526</b><br> Let us know if anything comes up'
        } 
    }
}