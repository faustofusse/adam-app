const server = require('http').createServer();

const io = require('socket.io')(server, {
  path: '/',
  serveClient: false,
  // below are engine.IO options
  pingInterval: 10000,
  pingTimeout: 5000,
  cookie: false
});

io.on('connection', socket => {
    console.log('Usuario conectado.');

    socket.on('button-press', (data) => {
        console.log('button-press: ' + data.button);
    });
    socket.on('button-release', (data) => {
        console.log('button-release: ' + data.button);
    });
});

server.listen(3000, () => {
    console.log('Servidor en el puerto 3000...');
});

module.exports = server;