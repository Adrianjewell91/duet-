
class Session {
    constructor(player) {
        this.player = player;
    }

    init(connectionString) {
        this.player.initKeyboard();
        this.sockets = this.initSockets(connectionString);
        try {
            window.navigator.requestMIDIAccess().then(access => {
                let activity;
                if (access.inputs.size > 0) {
                    activity = 'playing';
                    document.querySelector('.jam-session').innerHTML = `
                <h1 class="cover-heading">Instrument connected! Play your instrument to hear the music and see the keyboard light up</h1>
                `;

                    access.inputs.values().next().value.onmidimessage = (e) => {
                        console.log(e);
                        this.sockets[e.data[1] - 21].send(e.data);
                        this.player.playNote(e.data);
                    }

                } else {
                    activity = 'listening';
                    document.querySelector('.jam-session').innerHTML = `
                <h1 class="cover-heading">You Are listening only, enjoy the music!</h1>
            `;
                }

                console.log(activity);
            });

        } catch {
            const activity = 'listening';
            document.querySelector('.jam-session').innerHTML = `
                <h1 class="cover-heading">You Are listening only, enjoy the music!</h1>
            `;

            console.log(activity);
        }
    }

    initSockets(connectionString) {
        var sockets = new Array(88).fill((idx) => {
            const websocket = new WebSocket(connectionString + "/" + idx);
            websocket.binaryType = 'arraybuffer';

            websocket.onmessage = (event) => {
                console.log(event);
                if (event.data.byteLength < 3) return;
                const noteData = new Uint8Array(event.data);

                this.player.playNote(noteData, true);
            };

            return websocket;
        });

        return sockets.map((setUpSocket, idx) => setUpSocket(idx));
    }


    // TODO
    close() {
        // Close the session
    }
}