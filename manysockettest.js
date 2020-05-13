const http = require('http');
const WebSocket = require('ws');
const url = require('url');
const PORT = process.env.PORT || 3000;

const express = require('express');

const app = express().use(express.static('public'))

const server = http.createServer(app);

// and let's also 

//now let's create 88 web sockets; 
var keys = new Array(88).fill(() => new WebSocket.Server({ noServer: true }));
keys = keys.map((newSocket) => newSocket());
keys.forEach((socket,idx) => {
    socket.on('connection', function connection(ws) {
        // ...
        console.log("connected", idx);
        ws.on('message', function incoming(message) {
            console.log('received message: %s', message);
            socket.clients.forEach(function each(client) {
                if (client !== ws && client.readyState === WebSocket.OPEN) {
                    client.send(message);
                }
            });

        });
    });
})

// const wss1 = new WebSocket.Server({ noServer: true });
// const wss2 = new WebSocket.Server({ noServer: true });

// wss1.on('connection', function connection(ws) {
//     // ...
//     console.log("/foo");
//     ws.on('message', function incoming(message) {
//         console.log('received message: %s', message);
//         wss1.clients.forEach(function each(client) {
//             if (client !== ws && client.readyState === WebSocket.OPEN) {
//                 client.send(message);
//             }
//         });

//     });
// });

// wss2.on('connection', function connection(ws) {
//     // ...
//     console.log("/bar");
//     ws.on('message', function incoming(message) {
//         console.log('received message: %s', message);
//         wss2.clients.forEach(function each(client) {
//             if (client !== ws && client.readyState === WebSocket.OPEN) {
//                 client.send(message);
//             }
//         });

//     });
// });

server.on('upgrade', function upgrade(request, socket, head) {
    const pathname = url.parse(request.url).pathname;
    switch (pathname) {
        case '/0':
            keys[0].handleUpgrade(request, socket, head, function done(ws) {
                keys[0].emit('connection', ws, request);
            });
            break;
        case '/1':
            keys[1].handleUpgrade(request,socket,head,function done(ws) {
                keys[1].emit('connection', ws, request);
            });
            break;
        case '/2':
            keys[2].handleUpgrade(request,socket,head,function done(ws) {
                keys[2].emit('connection', ws, request);
            });
            break;
        case '/3':
            keys[3].handleUpgrade(request,socket,head,function done(ws) {
                keys[3].emit('connection', ws, request);
            });
            break;
        case '/4':
            keys[4].handleUpgrade(request,socket,head,function done(ws) {
                keys[4].emit('connection', ws, request);
            });
            break;
        case '/5':
            keys[5].handleUpgrade(request,socket,head,function done(ws) {
                keys[5].emit('connection', ws, request);
            });
            break;
        case '/6':
            keys[6].handleUpgrade(request,socket,head,function done(ws) {
                keys[6].emit('connection', ws, request);
            });
            break;
        case '/7':
            keys[7].handleUpgrade(request,socket,head,function done(ws) {
                keys[7].emit('connection', ws, request);
            });
            break;
        case '/8':
            keys[8].handleUpgrade(request,socket,head,function done(ws) {
                keys[8].emit('connection', ws, request);
            });
            break;
        case '/9':
            keys[9].handleUpgrade(request,socket,head,function done(ws) {
                keys[9].emit('connection', ws, request);
            });
            break;
        case '/10':
            keys[10].handleUpgrade(request,socket,head,function done(ws) {
                keys[10].emit('connection', ws, request);
            });
            break;
        case '/11':
            keys[11].handleUpgrade(request,socket,head,function done(ws) {
                keys[11].emit('connection', ws, request);
            });
            break;
        case '/12':
            keys[12].handleUpgrade(request,socket,head,function done(ws) {
                keys[12].emit('connection', ws, request);
            });
            break;
        case '/13':
            keys[13].handleUpgrade(request,socket,head,function done(ws) {
                keys[13].emit('connection', ws, request);
            });
            break;
        case '/14':
            keys[14].handleUpgrade(request,socket,head,function done(ws) {
                keys[14].emit('connection', ws, request);
            });
            break;
        case '/15':
            keys[15].handleUpgrade(request,socket,head,function done(ws) {
                keys[15].emit('connection', ws, request);
            });
            break;
        case '/16':
            keys[16].handleUpgrade(request,socket,head,function done(ws) {
                keys[16].emit('connection', ws, request);
            });
            break;
        case '/17':
            keys[17].handleUpgrade(request,socket,head,function done(ws) {
                keys[17].emit('connection', ws, request);
            });
            break;
        case '/18':
            keys[18].handleUpgrade(request,socket,head,function done(ws) {
                keys[18].emit('connection', ws, request);
            });
            break;
        case '/19':
            keys[19].handleUpgrade(request,socket,head,function done(ws) {
                keys[19].emit('connection', ws, request);
            });
            break;
        case '/20':
            keys[20].handleUpgrade(request,socket,head,function done(ws) {
                keys[20].emit('connection', ws, request);
            });
            break;
        case '/21':
            keys[21].handleUpgrade(request,socket,head,function done(ws) {
                keys[21].emit('connection', ws, request);
            });
            break;
        case '/22':
            keys[22].handleUpgrade(request,socket,head,function done(ws) {
                keys[22].emit('connection', ws, request);
            });
            break;
        case '/23':
            keys[23].handleUpgrade(request,socket,head,function done(ws) {
                keys[23].emit('connection', ws, request);
            });
            break;
        case '/24':
            keys[24].handleUpgrade(request,socket,head,function done(ws) {
                keys[24].emit('connection', ws, request);
            });
            break;
        case '/25':
            keys[25].handleUpgrade(request,socket,head,function done(ws) {
                keys[25].emit('connection', ws, request);
            });
            break;
        case '/26':
            keys[26].handleUpgrade(request,socket,head,function done(ws) {
                keys[26].emit('connection', ws, request);
            });
            break;
        case '/27':
            keys[27].handleUpgrade(request,socket,head,function done(ws) {
                keys[27].emit('connection', ws, request);
            });
            break;
        case '/28':
            keys[28].handleUpgrade(request,socket,head,function done(ws) {
                keys[28].emit('connection', ws, request);
            });
            break;
        case '/29':
            keys[29].handleUpgrade(request,socket,head,function done(ws) {
                keys[29].emit('connection', ws, request);
            });
            break;
        case '/30':
            keys[30].handleUpgrade(request,socket,head,function done(ws) {
                keys[30].emit('connection', ws, request);
            });
            break;
        case '/31':
            keys[31].handleUpgrade(request,socket,head,function done(ws) {
                keys[31].emit('connection', ws, request);
            });
            break;
        case '/32':
            keys[32].handleUpgrade(request,socket,head,function done(ws) {
                keys[32].emit('connection', ws, request);
            });
            break;
        case '/33':
            keys[33].handleUpgrade(request,socket,head,function done(ws) {
                keys[33].emit('connection', ws, request);
            });
            break;
        case '/34':
            keys[34].handleUpgrade(request,socket,head,function done(ws) {
                keys[34].emit('connection', ws, request);
            });
            break;
        case '/35':
            keys[35].handleUpgrade(request,socket,head,function done(ws) {
                keys[35].emit('connection', ws, request);
            });
            break;
        case '/36':
            keys[36].handleUpgrade(request,socket,head,function done(ws) {
                keys[36].emit('connection', ws, request);
            });
            break;
        case '/37':
            keys[37].handleUpgrade(request,socket,head,function done(ws) {
                keys[37].emit('connection', ws, request);
            });
            break;
        case '/38':
            keys[38].handleUpgrade(request,socket,head,function done(ws) {
                keys[38].emit('connection', ws, request);
            });
            break;
        case '/39':
            keys[39].handleUpgrade(request,socket,head,function done(ws) {
                keys[39].emit('connection', ws, request);
            });
            break;
        case '/40':
            keys[40].handleUpgrade(request,socket,head,function done(ws) {
                keys[40].emit('connection', ws, request);
            });
            break;
        case '/41':
            keys[41].handleUpgrade(request,socket,head,function done(ws) {
                keys[41].emit('connection', ws, request);
            });
            break;
        case '/42':
            keys[42].handleUpgrade(request,socket,head,function done(ws) {
                keys[42].emit('connection', ws, request);
            });
            break;
        case '/43':
            keys[43].handleUpgrade(request,socket,head,function done(ws) {
                keys[43].emit('connection', ws, request);
            });
            break;
        case '/44':
            keys[44].handleUpgrade(request,socket,head,function done(ws) {
                keys[44].emit('connection', ws, request);
            });
            break;
        case '/45':
            keys[45].handleUpgrade(request,socket,head,function done(ws) {
                keys[45].emit('connection', ws, request);
            });
            break;
        case '/46':
            keys[46].handleUpgrade(request,socket,head,function done(ws) {
                keys[46].emit('connection', ws, request);
            });
            break;
        case '/47':
            keys[47].handleUpgrade(request,socket,head,function done(ws) {
                keys[47].emit('connection', ws, request);
            });
            break;
        case '/48':
            keys[48].handleUpgrade(request,socket,head,function done(ws) {
                keys[48].emit('connection', ws, request);
            });
            break;
        case '/49':
            keys[49].handleUpgrade(request,socket,head,function done(ws) {
                keys[49].emit('connection', ws, request);
            });
            break;
        case '/50':
            keys[50].handleUpgrade(request,socket,head,function done(ws) {
                keys[50].emit('connection', ws, request);
            });
            break;
        case '/51':
            keys[51].handleUpgrade(request,socket,head,function done(ws) {
                keys[51].emit('connection', ws, request);
            });
            break;
        case '/52':
            keys[52].handleUpgrade(request,socket,head,function done(ws) {
                keys[52].emit('connection', ws, request);
            });
            break;
        case '/53':
            keys[53].handleUpgrade(request,socket,head,function done(ws) {
                keys[53].emit('connection', ws, request);
            });
            break;
        case '/54':
            keys[54].handleUpgrade(request,socket,head,function done(ws) {
                keys[54].emit('connection', ws, request);
            });
            break;
        case '/55':
            keys[55].handleUpgrade(request,socket,head,function done(ws) {
                keys[55].emit('connection', ws, request);
            });
            break;
        case '/56':
            keys[56].handleUpgrade(request,socket,head,function done(ws) {
                keys[56].emit('connection', ws, request);
            });
            break;
        case '/57':
            keys[57].handleUpgrade(request,socket,head,function done(ws) {
                keys[57].emit('connection', ws, request);
            });
            break;
        case '/58':
            keys[58].handleUpgrade(request,socket,head,function done(ws) {
                keys[58].emit('connection', ws, request);
            });
            break;
        case '/59':
            keys[59].handleUpgrade(request,socket,head,function done(ws) {
                keys[59].emit('connection', ws, request);
            });
            break;
        case '/60':
            keys[60].handleUpgrade(request,socket,head,function done(ws) {
                keys[60].emit('connection', ws, request);
            });
            break;
        case '/61':
            keys[61].handleUpgrade(request,socket,head,function done(ws) {
                keys[61].emit('connection', ws, request);
            });
            break;
        case '/62':
            keys[62].handleUpgrade(request,socket,head,function done(ws) {
                keys[62].emit('connection', ws, request);
            });
            break;
        case '/63':
            keys[63].handleUpgrade(request,socket,head,function done(ws) {
                keys[63].emit('connection', ws, request);
            });
            break;
        case '/64':
            keys[64].handleUpgrade(request,socket,head,function done(ws) {
                keys[64].emit('connection', ws, request);
            });
            break;
        case '/65':
            keys[65].handleUpgrade(request,socket,head,function done(ws) {
                keys[65].emit('connection', ws, request);
            });
            break;
        case '/66':
            keys[66].handleUpgrade(request,socket,head,function done(ws) {
                keys[66].emit('connection', ws, request);
            });
            break;
        case '/67':
            keys[67].handleUpgrade(request,socket,head,function done(ws) {
                keys[67].emit('connection', ws, request);
            });
            break;
        case '/68':
            keys[68].handleUpgrade(request,socket,head,function done(ws) {
                keys[68].emit('connection', ws, request);
            });
            break;
        case '/69':
            keys[69].handleUpgrade(request,socket,head,function done(ws) {
                keys[69].emit('connection', ws, request);
            });
            break;
        case '/70':
            keys[70].handleUpgrade(request,socket,head,function done(ws) {
                keys[70].emit('connection', ws, request);
            });
            break;
        case '/71':
            keys[71].handleUpgrade(request,socket,head,function done(ws) {
                keys[71].emit('connection', ws, request);
            });
            break;
        case '/72':
            keys[72].handleUpgrade(request,socket,head,function done(ws) {
                keys[72].emit('connection', ws, request);
            });
            break;
        case '/73':
            keys[73].handleUpgrade(request,socket,head,function done(ws) {
                keys[73].emit('connection', ws, request);
            });
            break;
        case '/74':
            keys[74].handleUpgrade(request,socket,head,function done(ws) {
                keys[74].emit('connection', ws, request);
            });
            break;
        case '/75':
            keys[75].handleUpgrade(request,socket,head,function done(ws) {
                keys[75].emit('connection', ws, request);
            });
            break;
        case '/76':
            keys[76].handleUpgrade(request,socket,head,function done(ws) {
                keys[76].emit('connection', ws, request);
            });
            break;
        case '/77':
            keys[77].handleUpgrade(request,socket,head,function done(ws) {
                keys[77].emit('connection', ws, request);
            });
            break;
        case '/78':
            keys[78].handleUpgrade(request,socket,head,function done(ws) {
                keys[78].emit('connection', ws, request);
            });
            break;
        case '/79':
            keys[79].handleUpgrade(request,socket,head,function done(ws) {
                keys[79].emit('connection', ws, request);
            });
            break;
        case '/80':
            keys[80].handleUpgrade(request,socket,head,function done(ws) {
                keys[80].emit('connection', ws, request);
            });
            break;
        case '/81':
            keys[81].handleUpgrade(request,socket,head,function done(ws) {
                keys[81].emit('connection', ws, request);
            });
            break;
        case '/82':
            keys[82].handleUpgrade(request,socket,head,function done(ws) {
                keys[82].emit('connection', ws, request);
            });
            break;
        case '/83':
            keys[83].handleUpgrade(request,socket,head,function done(ws) {
                keys[83].emit('connection', ws, request);
            });
            break;
        case '/84':
            keys[84].handleUpgrade(request,socket,head,function done(ws) {
                keys[84].emit('connection', ws, request);
            });
            break;
        case '/85':
            keys[85].handleUpgrade(request,socket,head,function done(ws) {
                keys[85].emit('connection', ws, request);
            });
            break;
        case '/86':
            keys[86].handleUpgrade(request,socket,head,function done(ws) {
                keys[86].emit('connection', ws, request);
            });
            break;
        case '/87':
            keys[87].handleUpgrade(request,socket,head,function done(ws) {
                keys[87].emit('connection', ws, request);
            });
            break;
        default:
            socket.destroy();
    }


    // if (pathname === '/foo') {
    //     wss1.handleUpgrade(request, socket, head, function done(ws) {
    //         wss1.emit('connection', ws, request);
    //     });
    // } else if (pathname === '/bar') {
    //     wss2.handleUpgrade(request, socket, head, function done(ws) {
    //         wss2.emit('connection', ws, request);
    //     });
    // } else {
    //     socket.destroy();
    // }
});

server.listen(PORT);