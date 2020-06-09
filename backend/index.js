const redis = require('redis')

const WSServer = require("ws").Server;
const server = new WSServer({port: 3000});

const Subscriber = redis.createClient(6379, 'redis');
const CHANNEL = 'hogehoge';

Subscriber.subscribe(CHANNEL);

server.on("connection", ws => {
  ws.on('message', message => {
    console.log(message);
    server.clients.forEach((client) => {
      client.send(message);
    });
  })

  Subscriber.on("message", (channel, message) => {
    console.log(message)
    if( ws.readyState == 1 ) {
      ws.send(message)
    }
  })
});

function noop() {}

function heartbeat() {
  this.isAlive = true;
}

server.on("connection", function connection(ws) {
  ws.isAlive = true;
  ws.on("pong", heartbeat);
});

const interval = setInterval(function ping() {
  server.clients.forEach(function each(ws) {
    if (ws.isAlive === false) return ws.terminate();

    ws.isAlive = false;
    ws.ping(noop);
  });
}, 30000);

server.on("close", function close() {
  clearInterval(interval);
});