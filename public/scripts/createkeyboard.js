function createKeyBoard(audioCtx) {
    const MIDI_NOTE_OFFSET = 21;

    function buildNote(audioCtx, pitch) {
        //Generative:
        // function _mtof(note) {
        //     return 440 * Math.pow(2, (note - 69) / 12);
        // }

        // var oscillator = audioCtx.createOscillator()
        var gainNode = audioCtx.createGain();
        // var filter = audioCtx.createBiquadFilter();

        // oscillator.type = 'sawtooth';
        // oscillator.frequency.value = _mtof(pitch);

        // filter.type = 'lowpass';

        // oscillator.connect(gainNode);
        // gainNode.connect(filter);
        // filter.connect(audioCtx.destination);

        // gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
        // oscillator.start();
        
        // return gainNode;

        // Sampling:
        // get the audio element
        const audioElement = document.getElementById(`sample-${pitch}`);

        // pass it into the audio context
        const track = audioCtx.createMediaElementSource(audioElement);
        track.connect(gainNode).connect(audioCtx.destination);

        return {audioElement, gainNode};
    }

    var keys = new Array(88).fill((idx) => buildNote(audioCtx, idx));
    // return keys.map((f, idx) => f(idx + MIDI_NOTE_OFFSET));
    return keys.map((f, idx) => f(idx + 1));
}