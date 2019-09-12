const server = require('http').createServer();
const ip = require('ip');
const sp = require('serialport')

const io = require('socket.io')(server, {
  path: '/',
  serveClient: false,
  pingInterval: 10000,
  pingTimeout: 5000,
  cookie: false
});

/*io.on('connection', () => {
  console.log('Usuario conectado');
})*/

const arduino = require('./arduino/arduino')(io);

server.listen(3000, async () => {
    await sp.list((err, ports) => {
      if (err) throw err;
      console.log(ports);
    });
    console.log('IP: ' + ip.address());
    console.log('Servidor en el puerto 3000...');
});

module.exports = server;