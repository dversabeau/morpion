const express = require("express");
const app = express();
const port = 8080;
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000", "http://192.168.1.31:3000/"],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

server.listen(port, () => {
  console.log("connection sur le port : " + port);
});

let rooms = [];

io.on("connection", (socket) => {
  console.log(`Connection de ${socket.id}`);

  socket.on("playerData", (player) => {
    player.socketId = socket.id;
    player.host = true
    player.turn = true
    let room = null;

    if (!player.roomId) {
      room = createRoom(player);
      console.log(`ROOM CREATED :
      room id : ${room.id}
      player username : ${player.username} 
      player socket : ${player.socketId}
      player host : ${player.host}`);
    }
  });
});

function createRoom(player) {
  const room = { id: roomId(), players: [] };

  player.roomId = room.id;
  room.players.push(player);
  rooms.room;

  return room;
}

function roomId() {
  return Math.random().toString(36).substring(2, 9);
}
