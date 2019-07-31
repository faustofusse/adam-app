const server = require('http').createServer();

const io = require('socket.io')(server, {
  path: '/test',
  serveClient: false,
  // below are engine.IO options
  pingInterval: 10000,
  pingTimeout: 5000,
  cookie: false
});

io.on('connection', socket => {
    console.log('Usuario conectado.');

    socket.on('left-press', () => {
        console.log('left-press');
    });
});

server.listen(3000, () => {
    console.log('Servidor en el puerto 3000...');
});

module.exports = server;