(function () {

    game.state.add('game', {

        create: function () {

            var ball = game.world.getByName('ball'),
            paddle = game.world.getByName('paddle');

            game.data = game.data || {};

            // start with three lives
            //game.data.lives = 3;
            game.data.lives_start = 3;
            game.data.lives_won = 0;
            game.data.lives_lost = 0;

            // Setup blocks
            Blocks.setupDataObjects()

            // setup game modes, start new game
            GameModes.setup();
            GameModes.newGame();

            // no downward collision
            game.physics.arcade.checkCollision.down = false;

            // physics
            game.physics.enable(paddle);

            Ball.setup.call(this);

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

            // pause key
            var pauseKey = game.input.keyboard.addKey(65);

            pauseKey.onUp.add(function () {

                if (GameModes.currentMode === 'game') {

                    console.log('game paused');

                    GameModes.switchMode.call(this, 'pause');
                    return;

                } else {

                    GameModes.switchMode.call(this, 'game');

                }

            })

            // setup features
            Features.onGameStart.call(this);
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

            // on angle change event
            Ball.tick();

        }

    });

}
    ());
