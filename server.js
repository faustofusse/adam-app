const express = require('express');
const app = express();
const server = require('http').Server(app);
const ip = require('ip');
const sp = require('serialport')

const io = require('socket.io')(server);
io.on('connection', () => {
  console.log('Usuario conectado');
})

// const arduino = require('./arduino/arduino')(io);

app.use(express.static('public'))

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
  // res.send('hola')
});

server.listen(3000, async () => {
    await sp.list((err, ports) => {
      if (err) throw err;
      console.log(ports);
    });
    console.log('IP: ' + ip.address());
    console.log('Servidor en el puerto 3000...');
});

module.exports = server;