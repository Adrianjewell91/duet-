'use strict'
const express = require('express');
const PORT = process.env.PORT || 3000;

const WebSocket = require('ws');

const server = express().use(express.static('public'))
    .listen(PORT, () => {
        console.log(`Duet app listening on port ${PORT}!`)
    });

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