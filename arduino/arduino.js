var five = require("johnny-five");
var board = new five.Board({port:'COM3'});

board.on("ready", function () {
    console.log('BRUH THE BOARD IS READY');
    var led = new five.Led(12);
    led.blink(1500);

    var proximity = new five.Proximity({
        controller: "HCSR04",
        pin: 7
    });

    proximity.on("data", function() {
        console.log("Proximity: ");
        console.log("  cm  : ", this.cm);
        console.log("  in  : ", this.in);
        console.log("-----------------");
    });

    proximity.on("change", function() {
        console.log("The obstruction has moved.");
    });

    this.repl.inject({ led });
});