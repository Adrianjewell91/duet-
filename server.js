'use strict';

const express = require('express');
const WebSocket = require('ws');
const PORT = process.env.PORT || 3000;

const server = express().use(express.static('public'))
    .listen(PORT, () => {
        console.log(`Example app listening on PORT ${PORT}!`)
    });
// const server = express().use(express.static('public'));

// server.get('/', function (req, res) {
//     res.sendFile(path.join(__dirname + '/public/index.html'));
// });

// server.listen(PORT, () => {
//     console.log(`Example app listening on PORT ${PORT}!`)
// });

const wss = new WebSocket.Server({ server });

wss.on('connection', function connection(ws) {
    console.log(ws);
    ws.on('message', function incoming(message) {
        console.log('received message: %s', message);
        wss.clients.forEach(function each(client) {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });

    });
});