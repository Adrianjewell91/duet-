function run() {
    var canvas = document.getElementById("canvas");
    canvas.width = document.body.clientWidth; //document.width is obsolete
    canvas.height = document.body.clientHeight; //document.height is obsolete
    canvasW = canvas.width;
    canvasH = canvas.height;
    var KEYS_PLAYED = new Set([]);
    DrawKeyboard(canvas, KEYS_PLAYED);

    document.querySelector('#play').addEventListener('click', () => {
        [audioCtx, keys, websocket] = setUp();
        let device;
        window.navigator.requestMIDIAccess().then(access => {
            device = access.inputs.values().next().value;
            device.onmidimessage = (e) => {
                // websocket.emit('note', JSON.stringify(e.data));
                websocket.send(JSON.stringify(e.data));
                _onmidimessage(e, keys, audioCtx, websocket);
            }
        });
        disableUI();
        console.log('playing')
    });

    document.querySelector('#listen').addEventListener('click', () => {
        [audioCtx, keys, websocket] = setUp();

        websocket.onmessage = function (event) {
            console.log(event);
            payload = {
                data: JSON.parse(event.data)
            }
            _onmidimessage(payload, keys, audioCtx);
        };
        disableUI();
        console.log('listening')
    });

    function setUp() {
        var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        var keys = createKeyBoard(audioCtx);
        var HOST = location.origin.replace(/^http/, 'ws');
        // let socket = io();
        var socket = new WebSocket(HOST);

        console.log(socket);

        return [audioCtx, keys, socket];
    }

    function disableUI() {
        document.querySelector('#listen').setAttribute('disabled', true);
        document.querySelector('#play').setAttribute('disabled', true);
    }

    function createKeyBoard(audioCtx) {
        function _mtof(note) {
            return 440 * Math.pow(2, (note - 69) / 12);
        }

        var keys = new Array(88).fill((idx) => {
            //So much configuration.
            var oscillator = audioCtx.createOscillator()
            var gainNode = audioCtx.createGain();
            var filter = audioCtx.createBiquadFilter();

            oscillator.type = 'sawtooth';
            oscillator.frequency.value = _mtof(idx);

            filter.type = 'lowpass';

            oscillator.connect(gainNode);
            gainNode.connect(filter);
            filter.connect(audioCtx.destination);

            gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
            
            oscillator.start();

            return gainNode;
        });

        // may want to pass all 88 keys through a gain node that levels the volume.
        // then connect that gain node to the destination (which is the speakers)

        return keys.map((f, idx) => f(idx + 21));
    }

    function _onmidimessage(e, keys, audioCtx) {
        /**
        * e.data is an array
        * e.data[0] = on (144) / off (128) / detune (224)
        * e.data[1] = midi note
        * e.data[2] = velocity || detune
        */
        switch (e.data[0]) {
            case 144:
                KEYS_PLAYED.add(e.data[1] - 21)
                keys[e.data[1] - 21].gain.setValueAtTime(e.data[2] / 100, audioCtx.currentTime);
                console.log(e);
                break;
            case 128:
                KEYS_PLAYED.delete(e.data[1] - 21)
                console.log(e);
                keys[e.data[1] - 21].gain.setValueAtTime(0, audioCtx.currentTime);
                break;
        }

        DrawKeyboard(canvas, KEYS_PLAYED)
        return 0;
    }
}