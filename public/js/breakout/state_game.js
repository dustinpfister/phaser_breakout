(function () {

    game.state.add('game', {

        create: function () {

            var ball = game.world.getByName('ball'),
            paddle = game.world.getByName('paddle');

            game.data = game.data || {};

            // set to round 1
            GameModes.setRound(game, 1);

            // start with three lives
            //game.data.lives = 3;
            game.data.lives_start = 3;
            game.data.lives_won = 0;
            game.data.lives_lost = 0;

            //centerPaddle(paddle);

            // Setup blocks
            Blocks.setupDataObjects()

            // mk text objects
            mkTextObjects({
                game: game,
                count: 3
            });

            // physics
            game.physics.enable([ball, paddle]);

            // no downward collision
            game.physics.arcade.checkCollision.down = false;

            ball.body.collideWorldBounds = true;
            ball.body.bounce.set(1);
            ball.checkWorldBounds = true;
            ball.events.onOutOfBounds.add(function () {

                //game.data.lives -= 1;
                //game.data.lives.lost += 1;
                Features.onBallLost.call(this)

                if (game.data.lives > 0) {

                    //centerPaddle(paddle);
                    //modes.currentMode = 'serve';
                    GameModes.switchMode.call(this, 'serve');

                } else {

                    //modes.currentMode = 'gameover';
                    GameModes.switchMode.call(this, 'gameover');

                }

            }, this);

            paddle.body.immovable = true;
            //paddle.body.collideWorldBounds = true;

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

                /*
                a = aUp - Math.PI / 180 * Features.paddleAngle * per * dir;
                x = Math.floor(Math.cos(a) * game.data.ballSpeed);
                y = Math.floor(Math.sin(a) * game.data.ballSpeed);

                ball.body.velocity.set(x, y);
                 */

                Features.onPaddleBallCollide(paddle, ball, per, dir, fromCenter);

            });

            // pause key
            var pauseKey = game.input.keyboard.addKey(65);

            pauseKey.onUp.add(function () {

                if (modes.currentMode === 'game') {

                    console.log('game paused');

                    modes.switchMode.call(this, 'pause');
                    return;

                }

                if (modes.currentMode === 'pause') {

                    modes.switchMode.call(this, 'game');

                }

            })

            // setup features
            Features.onGameStart.call(this);

            //modes.switchMode.call(this, 'serve');

            GameModes.switchMode.call(this, 'serve');

        },

        update: function () {

            var ball = game.world.getByName('ball'),
            paddle = game.world.getByName('paddle'),
            text;

            // check keyboard
            var keyboard = game.input.keyboard;

            // call the tick method for the current mode
            GameModes[GameModes.currentMode].tick.call(this, keyboard, paddle, ball);

        }

    });

}
    ());
