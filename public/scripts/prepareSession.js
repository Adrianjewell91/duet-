function prepareSession(connectionString = '',
    keys = [],
    audioCtx = new (window.AudioContext || window.webkitAudioContext)(),
    KEYS_PLAYED = new Set([]),
    DrawKeyboard = () => { },
    canvas 
) {

    var sockets = new Array(88).fill((idx) => {
        const websocket = new WebSocket(connectionString + "/" + idx);
        websocket.binaryType = 'arraybuffer';

        websocket.onmessage = function (event) {
            console.log(event);
            if (event.data.byteLength < 3) return;
            payload = new Uint8Array(event.data);

            _onmidimessage(payload, keys, audioCtx, KEYS_PLAYED, (canvas, keysPlayed, color) => DrawKeyboard(canvas, keysPlayed, color), canvas, true);
        };

        return websocket;
    });

    sockets = sockets.map((setUpSocket, idx) => setUpSocket(idx));

    try {
        window.navigator.requestMIDIAccess().then(access => {
            let activity;
            if (access.inputs.size > 0) {
                activity = 'playing';
                document.querySelector('.jam-session').innerHTML = `
                <h1 class="cover-heading">Instrument connected!</h1>
                `;
    
                access.inputs.values().next().value.onmidimessage = (e) => {
                    console.log(e);
                    sockets[e.data[1] - 21].send(e.data);
                    _onmidimessage(e.data, keys, audioCtx, KEYS_PLAYED, (canvas, keysPlayed, color) => DrawKeyboard(canvas, keysPlayed, color), canvas, false);
                }
    
            } else {
                activity = 'listening';
                document.querySelector('.jam-session').innerHTML = `
                <h1 class="cover-heading">No instrument connected, enjoy the music!</h1>
            `;
            }
    
            console.log(activity);
        });

    } catch {

        activity = 'listening';
        document.querySelector('.jam-session').innerHTML = `
                <h1 class="cover-heading">No instrument connected, enjoy the music!</h1>
            `;

        console.log(activity);
    }

}