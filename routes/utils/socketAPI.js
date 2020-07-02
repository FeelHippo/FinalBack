let socket_io = require('socket.io');
let io = socket_io();
let socketAPI = {};
const uniqid = require('uniqid');

const MESSAGE_TYPE = {
    SENT: 'SENT',
    RECEIVED: 'RECEIVED',
}

// socket logic
io.on('connection', socket => {
    // receive event and react
    socket.on('message', data => {
        // emit event to all connected users
        socket.emit('message', {
            ...data,
            type: MESSAGE_TYPE.RECEIVED,
            timestamp: Date.now(),
            id: uniqid()
    })
    })

    socket.on('typing', data => {
        socket.broadcast.emit('typing', data)
    })

    socket.on('no_typing', data => {
        socket.broadcast.emit('no_typing', data)
    })
})

//io.close();

socketAPI.io = io;
module.exports = socketAPI;