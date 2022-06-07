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
    origin: ['http://localhost:3000','http://192.168.1.31:3000/'],
    methods: ["GET", "POST"],
    credentials: true
  },
});

server.listen(port, () =>{
  console.log('connection sur le port : ' + port);
})
let rooms = [];

io.on('connection', (socket) => {
  console.log(`Connection de ${socket.id}`);

  socket.on('PlayerData', (player) => {
    console.log(`player : ${player.username}`);
    let room = null;
  })  
})
