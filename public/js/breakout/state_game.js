(function () {

    // more than one mode for the game
    // these are difreent methods that will be used in
    // the update method of the game state
    var modes = {

        currentMode: 'serve',

        // normal game flow
        game: function (keyboard, paddle, ball) {

            // default paddle velocity to zero
            paddle.body.velocity.set(0, 0);

            // set velocity based on keyboard
            if (keyboard.isDown(37)) {
                paddle.body.velocity.set(-200, 0);
            }
            if (keyboard.isDown(39)) {
                paddle.body.velocity.set(200, 0);
            }

            // collide with paddle
            this.game.physics.arcade.collide(ball, paddle);

            // collide with blocks
            this.game.physics.arcade.collide(ball, Blocks.blocks);

            if (Blocks.countAlive() === 0) {

                // just set up another set for now
                Blocks.setupDataObjects();

            }

        },

        // serve mode happens when first starting a new game, or a ball
        // goes out of bounds
        serve: (function () {

            var tick = 0,
            totalTicks = 50,
            dist = 100,
            startAngle = -Math.PI + Math.PI / 180 * 45;

            return function (keyboard, paddle, ball) {

                var per = tick / totalTicks,
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

                // if space
                if (keyboard.isDown(38)) {

                    modes.currentMode = 'game';

                    var angleToPaddle = Phaser.Point.angle({
                            x: ball.x,
                            y: ball.y
                        }, {
                            x: paddle.x,
                            y: paddle.y
                        }) + Math.PI,
                    x = Math.cos(angleToPaddle) * 200,
                    y = Math.sin(angleToPaddle) * 200;

                    ball.body.velocity.set(x, y);

                }

            };

        }
            ())

    };

    // add the state to game
    game.state.add('game', {

        create: function () {

            // ball
            var ball = game.add.sprite(0, 0, 'ball', 0),
            fd = game.data.frameData['ball'];
            ball.name = 'ball';
            ball.animations.add('roll', fd, 60, true);
            ball.animations.play('roll');

            // paddle
            var paddle = game.add.sprite(0, 0, 'paddle', 0);
            paddle.name = 'paddle';
            paddle.x = game.world.centerX;
            paddle.y = game.world.height - 16;
            paddle.anchor.set(0.5, 0.5);

            ball.x = paddle.x;
            ball.y = paddle.y - 50;
            ball.anchor.set(0.5, 0.5);

            // Setup blocks
            Blocks.setup();

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
            ball.body.velocity.set(0, 150);

            ball.checkWorldBounds = true;
            ball.events.onOutOfBounds.add(function () {

                modes.currentMode = 'serve';

            }, this);

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

                a = aUp - Math.PI / 180 * 75 * per * dir;

                x = Math.floor(Math.cos(a) * 200);
                y = Math.floor(Math.sin(a) * 200);

                console.log(x, y);

                ball.body.velocity.set(x, y);

            });

        },

        update: function () {

            var ball = game.world.getByName('ball'),
            paddle = game.world.getByName('paddle'),
            text;

            // check keyboard
            var keyboard = game.input.keyboard;

            modes[modes.currentMode].call(this, keyboard, paddle, ball);

            // text display
            game.world.getByName('text-0').text = 'score: ' + game.data.score;
            //game.world.getByName('text-0').text = 'ball-velocity: ' + ball.body.velocity.x + ',' + ball.body.velocity.y;
            //game.world.getByName('text-1').text = 'ball-position: ' + Math.floor(ball.x) + ',' + Math.floor(ball.y);
            //game.world.getByName('text-2').text = 'blocks alive: ' + Blocks.countAlive();
        }

    });

}
    ());
