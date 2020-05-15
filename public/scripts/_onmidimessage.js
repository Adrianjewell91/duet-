function _onmidimessage(data = [], keys = [], audioCtx, KEYS_PLAYED = new Set([]), redraw = () => { }, canvas, isRemotePlayer) {
    function noteOn({ audioElement, gainNode }, vol) {
        gainNode.gain.cancelScheduledValues(audioCtx.currentTime);
        gainNode.gain.setValueAtTime(vol, 0);
        audioElement.play();
        // gainNode.gain.linearRampToValueAtTime(vol, audioCtx.currentTime + 0.01);
        // gainNode.gain.linearRampToValueAtTime(vol * 0.5, audioCtx.currentTime + 0.5);
        // gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 5);
    }

    function noteOff({ audioElement, gainNode }) {
        // gainNode.gain.cancelScheduledValues(audioCtx.currentTime);
        // gainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.250);
        audioElement.pause();
        audioElement.currentTime = 0;
    }

    /**
    * data is an array
    * data[0] = on (144) / off (128) / detune (224)
    * data[1] = midi note
    * data[2] = velocity || detune
    */
    // console.log(data);
    const key = data[1] - 21;
    if (data[2] === 0 || data[0] === 128) {
        KEYS_PLAYED.delete(key)
        noteOff(keys[key]);
    } else if (data[0] === 144) {
        KEYS_PLAYED.add(key)
        noteOn(keys[key], (data[2] / 100) * (data[2] / 100));
    }

    return redraw(canvas, KEYS_PLAYED, isRemotePlayer ? "rgb(94,94,255)" : "rgb(255,0,0)");
}
