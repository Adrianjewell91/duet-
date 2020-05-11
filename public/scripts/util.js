function createKeyBoard(audioCtx) {
    function _mtof(note) {
        return 440 * Math.pow(2, (note - 69) / 12);
    }

    var keys = new Array(88).fill((idx) => {
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

    return keys.map((f, idx) => f(idx + 21));
}

function _onmidimessage(e, keys, audioCtx, KEYS_PLAYED = new Set([]), redraw = () => {}) {
    /**
    * e.data is an array
    * e.data[0] = on (144) / off (128) / detune (224)
    * e.data[1] = midi note
    * e.data[2] = velocity || detune
    */
    switch (e.data[0]) {
        case 144:
            KEYS_PLAYED.add(e.data[1] - 21)
            const vol = (e.data[2] / 100) * (e.data[2] / 100);
            keys[e.data[1] - 21].gain.linearRampToValueAtTime(vol, audioCtx.currentTime + 0.01);
            keys[e.data[1] - 21].gain.linearRampToValueAtTime(vol * 0.5, audioCtx.currentTime + 0.5);
            keys[e.data[1] - 21].gain.linearRampToValueAtTime(0, audioCtx.currentTime + 5);
            console.log(e);
            break;
        case 128:
            KEYS_PLAYED.delete(e.data[1] - 21)
            console.log(e);
            keys[e.data[1] - 21].gain.cancelScheduledValues(audioCtx.currentTime);
            keys[e.data[1] - 21].gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.05);
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