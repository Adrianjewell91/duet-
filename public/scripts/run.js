function run(DrawKeyboard = () => {}) {
    paintInitialPiano(DrawKeyboard);

    var KEYS_PLAYED = new Set([]);
    var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    var keys = createKeyBoard(audioCtx);
    var websocket = new WebSocket(location.origin.replace(/^http/, 'ws'));

    window.navigator.requestMIDIAccess().then(access => {
        let activity;
        if (access.inputs.size > 0) {
            activity = 'playing';
            document.querySelector('.jam-session').innerHTML = `
            <h1 class="cover-heading">Instrument connected!</h1>
            `;

            access.inputs.values().next().value.onmidimessage = (e) => {
                websocket.send(JSON.stringify(e.data));
                _onmidimessage(e, keys, audioCtx, KEYS_PLAYED, (a, b) => DrawKeyboard(a, b));
            }

        } else {
            activity = 'listening';
            document.querySelector('.jam-session').innerHTML = `
            <h1 class="cover-heading">No instrument connected, enjoy the music!</h1>
        `;
        }

        console.log(activity);
    });

    websocket.onmessage = function (event) {
        console.log(event);
        payload = {
            data: JSON.parse(event.data)
        }
        _onmidimessage(payload, keys, audioCtx, KEYS_PLAYED, (a,b) => DrawKeyboard(a,b));
    };
}
