document.querySelector('#play').addEventListener('click', () => {
    [audioCtx, keys, websocket] = setUp();
    let device;
    window.navigator.requestMIDIAccess().then(access => {
        device = access.inputs.values().next().value;
        device.onmidimessage = (e) => _onmidimessage(e, keys, audioCtx, websocket);
    });
    console.log('playing')
});

document.querySelector('#listen').addEventListener('click', () => {
    [audioCtx, keys, websocket] = setUp();

    websocket.onmessage = function (event) {
        console.log(event);
        payload = {
            data: JSON.parse(event.data)
        }
        _onmidimessage(payload, keys, audioCtx, websocket);
    };
    console.log('listening')
});

function setUp() {
    var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    var keys = createKeyBoard(audioCtx);
    var HOST = location.origin.replace(/^http/, 'ws');
    var websocket = new WebSocket(HOST);

    console.log(websocket);

    return [audioCtx, keys, websocket];
}

function createKeyBoard(audioCtx) {
    function _mtof(note) {
        return 440 * Math.pow(2, (note - 69) / 12);
    }

    var keys = new Array(88).fill((idx) => {
        var oscillator = audioCtx.createOscillator()
        var gainNode = audioCtx.createGain();
        oscillator.frequency.value = _mtof(idx);
        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
        oscillator.start();
        return gainNode;
    });

    // may want to pass all 88 keys through a gain node that levels the volume.
    // then connect that gain node to the destination (which is the speakers)

    return keys.map((f, idx) => f(idx + 21));
}

function _onmidimessage(e, keys, audioCtx, websocket) {
    /**
    * e.data is an array
    * e.data[0] = on (144) / off (128) / detune (224)
    * e.data[1] = midi note
    * e.data[2] = velocity || detune
    */
    switch (e.data[0]) {
        case 144:
            websocket.send(JSON.stringify(e.data));
            keys[e.data[1] - 21].gain.setValueAtTime(e.data[2] / 100, audioCtx.currentTime);
            console.log(e);
            break;
        case 128:
            console.log(e);
            websocket.send(JSON.stringify(e.data));
            keys[e.data[1] - 21].gain.setValueAtTime(0, audioCtx.currentTime);
            break;
    }

    return 0;
}