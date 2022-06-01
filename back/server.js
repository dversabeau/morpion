const express = require('express')
const app = express();
const port = 8080;
const http = require('http');
const {Server} = require('socket.io');
const cors = require('cors');

app.use(cors())

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ["GET", "POST"],
  },
});

io.on('connection', (socket) => {
  console.log(`Connection de ${socket.id}`);
})

server.listen(port, () =>{
  console.log('connection sur le port : ' + port);
})

