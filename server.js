'use strict';

const http = require('http');
const PORT = process.env.PORT || 3000;

const express = require('express');

const app = express().use(express.static('public'))

const server = http.createServer(app);

server.listen(PORT);