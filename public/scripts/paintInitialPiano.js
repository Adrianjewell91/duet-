function paintInitialPiano(painter = () => { }, canvas) {
    canvas.width = document.body.clientWidth;
    canvas.height = document.body.clientHeight / 2;
    canvasW = canvas.width;
    canvasH = canvas.height;
    return painter(canvas, new Set());
}