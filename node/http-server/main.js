const net = require('net');
const worker = require('./worker');

net
  .createServer(connection => {
    console.log('new connect')
    worker(connection);
  })
  .listen(80);