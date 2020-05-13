function run(DrawKeyboard = () => {}) {
    paintInitialPiano(DrawKeyboard);

    var KEYS_PLAYED = new Set([]);

    var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    var keys = createKeyBoard(audioCtx);
    
    // now create 88 websockets and see what happens:
<<<<<<< HEAD
    // var websocket = new WebSocket(location.origin.replace(/^http/, 'ws') + "/0");
=======
>>>>>>> a1584e6832f59735b497000ca303a1cdb1c1069b
    var sockets = new Array(88).fill((idx) => {
        const websocket = new WebSocket(location.origin.replace(/^http/, 'ws') + "/" + idx);
        websocket.binaryType = 'arraybuffer';

        websocket.onmessage = function (event) {
            console.log(event);
            payload = new Uint8Array(event.data);

<<<<<<< HEAD
            _onmidimessage(payload, keys, audioCtx, KEYS_PLAYED, (canvas, keysPlayed) => DrawKeyboard(canvas, keysPlayed));
=======
            _onmidimessage(payload, keys, audioCtx, KEYS_PLAYED, (a, b) => DrawKeyboard(a, b));
>>>>>>> a1584e6832f59735b497000ca303a1cdb1c1069b
        };

        return websocket;
    });

    sockets = sockets.map((connect, idx) => connect(idx));
<<<<<<< HEAD
=======
    // var websocket = new WebSocket(location.origin.replace(/^http/, 'ws') + "/0");
>>>>>>> a1584e6832f59735b497000ca303a1cdb1c1069b

    window.navigator.requestMIDIAccess().then(access => {
        let activity;
        if (access.inputs.size > 0) {
            activity = 'playing';
            document.querySelector('.jam-session').innerHTML = `
            <h1 class="cover-heading">Instrument connected!</h1>
            `;

            access.inputs.values().next().value.onmidimessage = (e) => {
                console.log(e);
<<<<<<< HEAD
                // websocket.send(e.data);
=======
>>>>>>> a1584e6832f59735b497000ca303a1cdb1c1069b
                sockets[e.data[1] - 21].send(e.data);
                _onmidimessage(e.data, keys, audioCtx, KEYS_PLAYED, (a, b) => DrawKeyboard(a, b));
            }

        } else {
            activity = 'listening';
            document.querySelector('.jam-session').innerHTML = `
            <h1 class="cover-heading">No instrument connected, enjoy the music!</h1>
        `;
        }

        console.log(activity);
    });
<<<<<<< HEAD

    // websocket.onmessage = function (event) {
    //     console.log(event);
    //     payload = new Uint8Array(event.data);

    //     _onmidimessage(payload, keys, audioCtx, KEYS_PLAYED, (a, b) => DrawKeyboard(a, b));
    // };
=======
>>>>>>> a1584e6832f59735b497000ca303a1cdb1c1069b
}
