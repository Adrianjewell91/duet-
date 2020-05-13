const http = require('http');
const WebSocket = require('ws');
const url = require('url');
const PORT = process.env.PORT || 3000;

const express = require('express');

const app = express().use(express.static('public'))

const server = http.createServer(app);
const wss1 = new WebSocket.Server({ noServer: true });
const wss2 = new WebSocket.Server({ noServer: true });

wss1.on('connection', function connection(ws) {
    // ...
    console.log("/foo");
    ws.on('message', function incoming(message) {
        console.log('received message: %s', message);
        wss1.clients.forEach(function each(client) {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });

    });
});

wss2.on('connection', function connection(ws) {
    // ...
    console.log("/bar");
    ws.on('message', function incoming(message) {
        console.log('received message: %s', message);
        wss2.clients.forEach(function each(client) {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });

    });
});

server.on('upgrade', function upgrade(request, socket, head) {
    const pathname = url.parse(request.url).pathname;

    if (pathname === '/foo') {
        wss1.handleUpgrade(request, socket, head, function done(ws) {
            wss1.emit('connection', ws, request);
        });
    } else if (pathname === '/bar') {
        wss2.handleUpgrade(request, socket, head, function done(ws) {
            wss2.emit('connection', ws, request);
        });
    } else {
        socket.destroy();
    }
});

server.listen(PORT);