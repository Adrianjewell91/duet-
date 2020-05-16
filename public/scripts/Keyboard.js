
class Keyboard {
    constructor(canvas) {
        this.canvas = canvas;
        this.currentNotes = new Set([]);
        this.drawKeyboard = window.DrawKeyboard;
    }

    init() {
        this.drawKeyboard(this.canvas, new Set([]));
    }

    render() {
        this.drawKeyboard(this.canvas, this.currentNotes);
    }
}