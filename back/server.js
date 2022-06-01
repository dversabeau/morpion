const express = require('express')
const app = express();
const path = require('path');
const port = 8080;
const http = require('http').createServer(app);

const io = require('socket.io')(http);

app.get('/', (req, res) => {

});

http.listen(port, () =>{
  console.log('connection sur le port : ' + port);
})