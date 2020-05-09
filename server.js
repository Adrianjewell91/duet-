'use strict';

const express = require('express');
const { Server } = require('ws');

const PORT = process.env.PORT || 3000;
// const INDEX = '/index.html';


const server = express().use(express.static('public'))
    .listen(PORT, () => {
        console.log(`Example app listening on port ${PORT}!`)
    });
const wss = new Server({ server });

wss.on('connection', function connection(ws) {
    console.log('Client connected');
    // console.log(ws);
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

setInterval(() => {
    wss.clients.forEach((client) => {
        client.send(new Date().toTimeString());
    });
}, 1000);