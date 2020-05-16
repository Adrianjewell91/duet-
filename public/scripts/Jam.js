class Jam {
    constructor(canvas, connectionString) {
        this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        this.keyboard = new Keyboard(canvas);
        this.player = new Player(this.keyboard, this.audioCtx);
        this.session = new Session(this.player);
        this.connectionString = connectionString;
    }

    init() {
        this.session.init(this.connectionString);
    }
}