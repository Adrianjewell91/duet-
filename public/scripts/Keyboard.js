
class Keyboard {
    constructor(canvas) {
        this.canvas = canvas;
        this.currentNotes = new Set([]);
        this.noteOwners = new Map();
        this.drawKeyboard = window.DrawKeyboard;
    }

    init() {
        this.drawKeyboard(this.canvas, new Set([]), new Map());
    }

    render() {
        this.drawKeyboard(this.canvas, this.currentNotes, this.noteOwners);
    }
}