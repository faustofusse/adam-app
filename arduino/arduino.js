module.exports = (io) => {
    var five = require("johnny-five");
    const {Board, Proximity} = require("johnny-five");
    var board = new five.Board({port:'COM3'});

    board.on("ready", function () {
        
        m10 = new five.Pin(13);
        m11 = new five.Pin(12);
        m20 = new five.Pin(11);
        m21 = new five.Pin(10);

        cons proximity = new Proximity({

        	controller: "HCSR04",
        	pin: 7

        })

        proximity.on("change", () => {
        	if (proximity.cm>5){
        	     m10.low();
                 m21.low();
        	}
        })






        io.on('connection', socket => {
            console.log('Usuario conectado.');

            socket.on('button-press', (data) => {
                console.log('button-press: ' + data.button);
                if (data.button === '1') {

                } else if (data.button === '2') {

                } else if (data.button === '3') {

                } else if (data.button === '4') {

                } else if (data.button === 'up') {

                    m10.high();
                    m11.low();
                    m20.high();
                    m21.low();
                    console.log("adelante");

                } else if (data.button === 'down') {

                    m10.low();
                    m11.high();
                    m20.low();
                    m21.high();
                    console.log("atras");

                } else if (data.button === 'left') {

                    m10.high();
                    m11.low();
                    m20.low();
                    m21.high();
                    console.log("izquierda");

                } else if (data.button === 'right') {

                    m10.low();
                    m11.high();
                    m20.high();
                    m21.low();
                    console.log("derecha");

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

                    m10.low();
                    m11.low();
                    m20.low();
                    m21.low();

                } else if (data.button === 'down') {

                    m10.low();
                    m11.low();
                    m20.low();
                    m21.low();

                } else if (data.button === 'left') {

                    m10.low();
                    m11.low();
                    m20.low();
                    m21.low();

                } else if (data.button === 'right') {

                    m10.low();
                    m11.low();
                    m20.low();
                    m21.low();

                } else if (data.button === 'center') {

                }
            });
        });


        /**
         * Motor A: PWM 11, dir 12
         * Motor B: PWM 5, dir 4
         
        var motors = new five.Motors([
            { pins: { dir: 13, pwm: 12 }, invertPWM: true },
            { pins: { dir: 11, pwm: 10 }, invertPWM: true }
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
*/
    });
}