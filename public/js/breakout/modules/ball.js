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

    onAngleChange: function () {

        if (GameModes.currentMode === 'game') {

            Ball.set(Ball.ball.body.angle, Features.ballSpeed);

        }

    },

    tick: function () {

        // onAngleChange
        if (Ball.ball.body.angle != Ball.tempAngle) {

            Ball.tempAngle = Ball.ball.body.angle;
            Ball.onAngleChange();

        }

    }

};
