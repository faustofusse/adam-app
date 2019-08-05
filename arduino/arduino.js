module.exports = (io) => {
    var five = require("johnny-five");
    var board = new five.Board({port:'COM4'});

    board.on("ready", function () {
        io.on('connection', socket => {
            console.log('Usuario conectado.');

            socket.on('button-press', (data) => {
                console.log('button-press: ' + data.button);
                if (data.button === '1') {

                } else if (data.button === '2') {

                } else if (data.button === '3') {

                } else if (data.button === '4') {

                } else if (data.button === 'up') {

                } else if (data.button === 'down') {

                } else if (data.button === 'left') {

                } else if (data.button === 'right') {

                } else if (data.button === 'center') {

                }
            });

            socket.on('button-release', (data) => {
                console.log('button-release: ' + data.button);
                if (data.button === '1') {

                } else if (data.button === '2') {

                } else if (data.button === '3') {

                } else if (data.button === '4') {

                } else if (data.button === 'up') {

                } else if (data.button === 'down') {

                } else if (data.button === 'left') {

                } else if (data.button === 'right') {

                } else if (data.button === 'center') {

                }
            });
        });


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

}