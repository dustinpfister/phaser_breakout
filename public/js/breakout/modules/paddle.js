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

        var paddle = Paddle.paddle = game.world.getByName('paddle');

        game.physics.enable(paddle);

    }

};
