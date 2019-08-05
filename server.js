const server = require('http').createServer();

const io = require('socket.io')(server, {
  path: '/',
  serveClient: false,
  pingInterval: 10000,
  pingTimeout: 5000,
  cookie: false
});

// const arduino = require('./arduino/arduino')(io);

var five = require("johnny-five");
var board = new five.Board();

server.listen(3000, () => {
    console.log('Servidor en el puerto 3000...');
});

module.exports = server;