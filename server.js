'use strict'
const express = require('express');
var path = require('path');
const PORT = process.env.PORT || 3000;

const WebSocket = require('ws');

const server = express();
server.use(express.static('public'));

server.get('/', function (_, res) {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

server.get('/jam', function (_, res) {
    res.sendFile(path.join(__dirname + '/public/jam.html'));
});

server.listen(PORT, () => console.log(`Duet app listening at http://localhost:${PORT}`))


const wss = new WebSocket.Server({ server });

wss.on('connection', function connection(ws) {
    console.log(
        'Client Connected'
    );

    ws.on('message', function incoming(message) {
        console.log('received message: %s', message);
        wss.clients.forEach(function each(client) {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });

    });

    ws.on('close', () => console.log('Client disconnected'));
});