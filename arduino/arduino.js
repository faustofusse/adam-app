var five = require("johnny-five");
var board = new five.Board();

board.on("ready", function () {
    /**
     * Motor A: PWM 11, dir 12
     * Motor B: PWM 5, dir 4
     */
    var motors = new five.Motors([
        { pins: { dir: 12, pwm: 11 }, invertPWM: true },
        { pins: { dir: 4, pwm: 5 }, invertPWM: true }
    ]);

    board.repl.inject({
        motors: motors
    });

    // Go forward at full speed for 5 seconds
    console.log("Full speed ahead!");
    motors.forward(255);
    board.wait(5000, function () {
        motors.stop();
    });

    // Go backwards at full speed for 5 seconds
    console.log("Now backwards!");
    motors.reverse(255);
    board.wait(5000, function () {
        motors.stop();
    });

    // Go left...
    console.log("To the left!");
    motors[0].reverse(200);
    motors[1].forward(200);
    board.wait(5000, function () {
        motors.stop();
    });

    // Go right...
    console.log("To the right!");
    motors[0].forward(200);
    motors[1].reverse(200);
    board.wait(5000, function () {
        motors.stop();
    });

    // Use REPL if you want to go further
    console.log("Done auto-driving! Use `motors` to control motors in REPL");

});

/*

board.on("ready", function () {
    console.log('BRUH THE BOARD IS READY');
    var led = new five.Led(13);
    led.blink(1500);

    var motor = new five.Motor({
        pins: {
            pwm: 6,
            dir: 7
        },
        invertPWM: true
    });

    motor.on("start", function () {
        console.log("start", Date.now());
    });

    // set the motor going forward full speed
    motor.forward(255);

    // var proximity = new five.Proximity({
    //     controller: "HCSR04",
    //     pin: 7
    // });

    // proximity.on("data", function() {
    //     console.log("Proximity: ");
    //     console.log("  cm  : ", this.cm);
    //     console.log("  in  : ", this.in);
    //     console.log("-----------------");
    // });

    // proximity.on("change", function() {
    //     console.log("The obstruction has moved.");
    // });

    this.repl.inject({ led, motor });
});*/