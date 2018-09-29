/***********
game.js

Just a reminder of what this file is for

 * GAME STATE - the main Game state object

 ***********/

(function () {

    game.state.add('game', {

        create: function () {

            var ball = game.world.getByName('ball'),
            paddle = game.world.getByName('paddle');

            game.data = game.data || {};

            // make sure game sprites are visible
            Blocks.blocks.visible = true;
            Ball.ball.visible = true;

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
            //game.physics.enable(paddle);

            Ball.setup.call(this);
            // setup paddle
            Paddle.setup.call(this);

            

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
