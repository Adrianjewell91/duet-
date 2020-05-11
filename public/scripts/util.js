function createKeyBoard(audioCtx) {
    const MIDI_NOTE_OFFSET = 21;

    function buildNote(audioCtx, pitch) {
        function _mtof(note) {
            return 440 * Math.pow(2, (note - 69) / 12);
        }

        var oscillator = audioCtx.createOscillator()
        var gainNode = audioCtx.createGain();
        var filter = audioCtx.createBiquadFilter();

        oscillator.type = 'sawtooth';
        oscillator.frequency.value = _mtof(pitch);

        filter.type = 'lowpass';

        oscillator.connect(gainNode);
        gainNode.connect(filter);
        filter.connect(audioCtx.destination);

        gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
        oscillator.start();
        return gainNode;
    }

    var keys = new Array(88).fill((idx) => buildNote(audioCtx, idx));
    return keys.map((f, idx) => f(idx + MIDI_NOTE_OFFSET));
}

function _onmidimessage(data, keys, audioCtx, KEYS_PLAYED = new Set([]), redraw = () => {}) {
    function noteOn(gainNode, vol) {
        gainNode.gain.linearRampToValueAtTime(vol, audioCtx.currentTime + 0.01);
        gainNode.gain.linearRampToValueAtTime(vol * 0.5, audioCtx.currentTime + 0.5);
        gainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 5);
    }

    function noteOff(gainNode) {
        gainNode.gain.cancelScheduledValues(audioCtx.currentTime);
        gainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.05);
    }

    /**
    * data is an array
    * data[0] = on (144) / off (128) / detune (224)
    * data[1] = midi note
    * data[2] = velocity || detune
    */
    // console.log(data);
    const key = data[1] - 21;
    switch (data[0]) {
        case 144:
            KEYS_PLAYED.add(key)
            noteOn(keys[key], (data[2] / 100) * (data[2] / 100));
            break;
        case 128:
            KEYS_PLAYED.delete(key)
            noteOff(keys[key]);
            break;
    }

    return redraw(canvas, KEYS_PLAYED);
}

function paintInitialPiano(painter = () => { }) {
    var canvas = document.getElementById("canvas");
    canvas.width = document.body.clientWidth; 
    canvas.height = document.body.clientHeight / 2; 
    canvasW = canvas.width;
    canvasH = canvas.height;
    return painter(canvas, new Set());
}