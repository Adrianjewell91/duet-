function init(connectionString = '', DrawKeyboard = () => {}) {
    var canvas = document.getElementById("canvas");
    paintInitialPiano(DrawKeyboard, canvas);

    var KEYS_PLAYED = new Set([]);

    var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    var keys = createKeyBoard(audioCtx);
    
    initSession(connectionString, keys, audioCtx, KEYS_PLAYED, DrawKeyboard, canvas);
}

