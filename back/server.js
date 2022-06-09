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
    console.log('playerData', player.username)
    player.socketId = socket.id;
    let room = null;

    if (!player.roomId) {
      room = createRoom(player);

      console.log(`ROOM CREATED :
      room id : ${room.id}
      player username : ${player.username} 
      player socket : ${player.socketId}
      player host : ${player.host}`);
    } else {
      room = rooms.find((r) => r.id === player.roomId);

      if (room === undefined) {
        return;
      }

      room.players.push(player);
      console.log(`${player.username} à rejoint la room ${room.id}`)
    }

    socket.join(room.id);
    console.log('players in the room', room.players.length)

    // io.to(socket.id).emit("join room", {player, room});

    if (room.players.length === 2) {
      io.to(room.id).emit("start game", room.players);
      console.log('start game');
    }
  });

  socket.on("get rooms", () => {
    io.to(socket.id).emit("list rooms", rooms);
  });

  socket.on("disconnect", () => {
    console.log(`Déconnection de ${socket.id}`);
    let room = null;

    rooms.forEach((r) => {
      r.players.forEach((p) => {
        if (p.socketId === socket.id && p.host) {
          room = r;
          rooms = rooms.filter((r) => r !== room);
        }
      });
    });
  });

  socket.on("join room", (data) => {
    const {player, item} = data;
    if (player.username !== "") {
      player.roomId = item.id;
      socket.emit("playerData", player);
    } else {
      console.log('Pas de pseudo')
    }
  });
});

function createRoom(player) {
  const room = { id: roomId(), players: [] };

  player.roomId = room.id;

  player.host = true;
  player.turn = true;
  room.players.push(player);
  rooms.push(room);

  return room;
}

function roomId() {
  return Math.random().toString(36).substring(2, 9);
}
