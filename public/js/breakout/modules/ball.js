/***********
ball.js

Just a reminder of what this file is for

    * BALL SPRITE - holds a reference to the ball sprite
    * METHODS - Methods for Setting up the ball, and what to do on each tick

***********/
var Ball = {

    ball: null, // a ref to the ball sprite
    tempAngle: 0,

    // set angle, and speed
    set: function (angle, speed) {

        var x = Math.cos(angle) * speed,
        y = Math.sin(angle) * speed;

        Ball.ball.body.velocity.set(x, y);
        Ball.tempAngle = angle;

    },

    // should fire each time the balls angle changes
    onAngleChange: function () {

        if (GameModes.currentMode === 'game') {

            Ball.set(Ball.ball.body.angle, Features.ballSpeed);

        }

    },

    // should be called on each frame tick
    tick: function () {

        // onAngleChange
        if (Ball.ball.body.angle != Ball.tempAngle) {

            Ball.tempAngle = Ball.ball.body.angle;
            Ball.onAngleChange();

        }

    },

    // setup the ball, should only be called once, durring in a create method
    setup: function () {

        var ball = Ball.ball;

        game.physics.enable(ball);

        ball.body.collideWorldBounds = true;
        ball.body.bounce.set(1);
        ball.checkWorldBounds = true;

        // set the ball body immovable to true
        // to make the ball plow threw blocks rather than
        // bounce off of them
        ball.body.immovable = false;

        ball.events.onOutOfBounds.add(function () {

            // ??? I have to do this because for some reason
            // the event fires even when the ball is not out of bounds
            // during serve mode
            if (GameModes.currentMode === 'game') {

                Features.onBallLost.call(this);

                if (game.data.lives > 0) {

                    //centerPaddle(paddle);
                    //modes.currentMode = 'serve';
                    GameModes.switchMode.call(this, 'serve');

                } else {

                    //modes.currentMode = 'gameover';
                    GameModes.switchMode.call(this, 'gameover');

                }

            }

        }, this);

    }

};
