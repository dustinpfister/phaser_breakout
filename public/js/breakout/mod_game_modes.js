// more than one mode for the game
// these are different methods that will be used in
// the update method of the game state
var GameModes = (function () {

    // Helpers
    var centerPaddle = function (paddle) {
        paddle.x = game.world.centerX;
        paddle.y = game.world.height - 16;
        paddle.anchor.set(0.5, 0.5);
    };

    // set round method
    var setRound = function (game, round) {

        game.data.round = round;

        // ball speed formula
        game.data.ballSpeed = Math.floor(100 + 25 * round);

    };

    // set ball velocity
    var setBallVelocity = function (paddle, ball) {

        var angleToPaddle = Phaser.Point.angle({
                x: ball.x,
                y: ball.y
            }, {
                x: paddle.x,
                y: paddle.y
            }) + Math.PI,
        x = Math.cos(angleToPaddle) * game.data.ballSpeed,
        y = Math.sin(angleToPaddle) * game.data.ballSpeed;

        // set ball velocity
        ball.body.velocity.set(x, y);
        saveBallVelocity(ball);

    };

    // sve ball velocity
    var saveBallVelocity = function (ball) {

        ball.data.saveVelocity = new Phaser.Point(ball.body.velocity.x, ball.body.velocity.y);

    };

    // load ball velocity
    var loadBallVelocity = function (ball) {

        var save = ball.data.saveVelocity;
        ball.body.velocity.set(save.x, save.y);

    };

    var api = {

        currentMode: 'serve',

        // call where needed to switch the current game mode
        switchMode: function (mode, context) {

            var paddle = this.game.world.getByName('paddle'),
            ball = this.game.world.getByName('ball');

            GameModes.currentMode = mode;

            // call the states setup methods if it has one
            var setup = GameModes[GameModes.currentMode].setup;

            if (setup) {
                setup.call(this, paddle, ball);
            }

        },

        // normal game flow
        game: {

            setup: function (paddle, ball) {

                loadBallVelocity(ball);

                centerPaddle(paddle);

            },

            tick: function (keyboard, paddle, ball) {

                var game = this.game;

                // default paddle velocity to zero
                paddle.body.velocity.set(0, 0);

                // set velocity based on keyboard
                if (keyboard.isDown(37)) {
                    paddle.body.velocity.set(-200, 0);
                }
                if (keyboard.isDown(39)) {
                    paddle.body.velocity.set(200, 0);
                }

                // set velocity based on active pointer
                if (game.input.activePointer.isDown) {

                    if (game.input.x < paddle.x - 10) {

                        paddle.body.velocity.set(-200, 0);

                    }

                    if (game.input.x > paddle.x + 10) {

                        paddle.body.velocity.set(200, 0);

                    }

                }

                // collide with paddle
                game.physics.arcade.collide(ball, paddle);

                // collide with blocks
                game.physics.arcade.collide(ball, Blocks.blocks);

                if (Blocks.countAlive() === 0) {

                    // start new round!
                    setRound(game, game.data.round += 1);

                    // just set up another set for now
                    Blocks.setupDataObjects();

                    centerPaddle(paddle);

                    // set back to serve mode
                    GameModes.switchMode.call(this, 'serve');

                }

                // text
                game.world.getByName('text-0').text = 'round: ' + game.data.round + ' score: ' + game.data.score;
                game.world.getByName('text-1').text = 'lives: ' + game.data.lives;

            }
        },

        // serve mode happens when first starting a new game, or a ball
        // goes out of bounds
        serve: (function () {

            var tick = 0,
            game = this.game,
            totalTicks = 150,
            dist = 100,
            startAngle = -Math.PI + Math.PI / 180 * 45;

            var serveBall = function (paddle, ball) {

                setBallVelocity(paddle, ball);

                // start ball roll animation
                ball.animations.play('roll');

                // switch to game mode
                //GameModes.currentMode = 'game';
                GameModes.switchMode.call(this, 'game');

            };

            return {

                setup: function () {

                    var paddle = this.game.world.getByName('paddle');

                    centerPaddle(paddle);

                },

                tick: function (keyboard, paddle, ball) {

                    var game = this.game,
                    per = tick / totalTicks,
                    bias = Math.abs(0.5 - per) / 0.5,
                    angle = startAngle + (Math.PI / 180 * 90 * bias);

                    // stop any animation, set a static frame
                    ball.animations.stop();
                    ball.frame = 1;

                    // velocity is set at zero for now,same for paddle
                    ball.body.velocity.set(0, 0);
                    paddle.body.velocity.set(0, 0);

                    ball.x = paddle.x + Math.cos(angle) * dist;
                    ball.y = paddle.y + Math.sin(angle) * dist;

                    tick += 1;
                    tick %= totalTicks;

                    // if up on keyboard
                    if (keyboard.isDown(38)) {

                        serveBall.call(this, paddle, ball);

                    }

                    if (game.input.activePointer.isDown) {

                        serveBall.call(this, paddle, ball);

                    }

                    // text
                    game.world.getByName('text-0').text = 'round: ' + game.data.round + ' score: ' + game.data.score;
                    game.world.getByName('text-1').text = 'lives: ' + game.data.lives;
                    //game.world.getByName('text-2').text = 'lives_lost: ' + game.data.lives_lost;

                }

            };

        }
            ()),

        // game over mode
        gameover: {

            setup: function (paddle) {

                // default paddle velocity to zero
                paddle.body.velocity.set(0, 0);

                game.world.getByName('text-0').text = 'Game Over - press up arrow on keyboard to restart';
                game.world.getByName('text-1').text = 'score: ' + this.game.data.score;

            },
            tick: function (keyboard, paddle, ball) {

                // if up on keyboard
                if (keyboard.isDown(38)) {

                    game.state.start('game', false, false);

                }

            }

        },

        // what to do when the game is paused
        pause: {

            setup: function () {

                var paddle = this.game.world.getByName('paddle'),
                ball = this.game.world.getByName('ball');

                saveBallVelocity(ball);

            },

            tick: function (keyboard, paddle, ball) {

                ball.body.velocity.set(0, 0);

                game.world.getByName('text-0').text = 'Game Paused - Press \'a\' key to continue.';

            }

        }

    };

    api.setRound = function (game, round) {

        game.data.round = round;

        // ball speed formula
        game.data.ballSpeed = Math.floor(100 + 25 * round);

    };

    return api;

}
    ());