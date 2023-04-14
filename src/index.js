const express = require('express');
const app = express();
const cors = require('cors')
const http = require('http');
app.use(cors(
    {origin: 'http://localhost:5000'}
))
const server = http.createServer(app);


const { Server } = require('socket.io')

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5000', 
        methods: ['GET', 'POST'], 
        credentials: true 
    }
})

io.on('connection', (socket) => {
    console.log('a user connected');
    
    socket.on('disconnect', () => {
        console.log('user disconnected')
    })

    socket.on('chat message', msg => {
        console.log('message:', msg)
    })

    socket.emit('header', { 'Access-Control-Allow-Origin': 'http://localhost:5000' });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});