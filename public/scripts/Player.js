class Player {
    constructor(keyboard, audioCtx) {
        this.keyboard = keyboard;
        this.keys = this.createKeyBoard(audioCtx);
    }

    initKeyboard() {
        this.keyboard.init();
    }

    createKeyBoard(audioCtx) {
        var keys = new Array(88).fill((idx) => {
            var gainNode = audioCtx.createGain();

            const audioElement = document.getElementById(`sample-${idx}`);

            const track = audioCtx.createMediaElementSource(audioElement);
            track.connect(gainNode).connect(audioCtx.destination);

            return { audioElement, gainNode };
        });
        return keys.map((f, idx) => f(idx + 1));
    }

    noteOn({ audioElement, gainNode }, vol) {
        gainNode.gain.setValueAtTime(vol, 0);
        audioElement.play();
    }

    noteOff({ audioElement, gainNode }) {
        audioElement.pause();
        audioElement.currentTime = 0;
    }

    playNote(noteData) {
        /**
        * data is an array
        * data[0] = on (144) / off (128) / detune (224)
        * data[1] = midi note
        * data[2] = velocity || detune
        */
        // console.log(data);
        const key = noteData[1] - 21;
        if (noteData[2] === 0 || noteData[0] === 128) {
            this.keyboard.currentNotes.delete(key);
            this.noteOff(this.keys[key]);
        } else if (noteData[0] === 144) {
            this.keyboard.currentNotes.add(key);
            this.noteOn(this.keys[key], (noteData[2] / 100) * (noteData[2] / 100));
        }

        return this.keyboard.render();
    }

}
