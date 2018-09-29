/***********
paddle.js

Just a reminder of what this file is for

 * PADDLE SPRITE - holds a reference to the ball sprite
 * METHODS - Methods for Setting up the ball, and what to do on each tick

 ***********/
var Paddle = {

    paddle: null,

    // setup the paddle, should only be called once, during in a create method
    setup: function () {

        var game = this.game;

        var paddle = Paddle.paddle = game.world.getByName('paddle'),
        ball = Ball.ball;

        game.physics.enable(paddle);

        paddle.body.immovable = true;
        paddle.body.collideWorldBounds = true;
        paddle.body.onCollide = new Phaser.Signal();
        paddle.body.onCollide.add(function () {

            var max = paddle.width / 2 + ball.width / 2,
            fromCenter = Math.abs(ball.x - paddle.x),
            dir = ball.x - paddle.x < 0 ? 1 : -1;
            per = fromCenter / max,
            x = 0,
            y = 0,
            aUp = -Math.PI / 2,
            a = aUp;

            // clamp per
            per = Phaser.Math.clamp(per, 0, 1);

            Features.onPaddleBallCollide(paddle, ball, per, dir, fromCenter);

        });

    }

};
