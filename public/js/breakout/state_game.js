game.state.add('game', {

    create: function () {

        // ball
        var ball = game.add.sprite(0, 0, 'ball', 0),
        fd = game.global.frameData['ball'];
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

            ball.x = paddle.x;
            ball.y = paddle.y - 20;
            ball.body.velocity.set(0, 150);

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

            a = aUp - Math.PI / 180 * 75 * per * dir

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

        // default paddle velocity to zero
        paddle.body.velocity.set(0, 0);

        // check keyboard
        var k = game.input.keyboard;

        // set velocity based on keyboard
        if (k.isDown(37)) {
            paddle.body.velocity.set(-200, 0);
        }
        if (k.isDown(39)) {
            paddle.body.velocity.set(200, 0);
        }

        // collide with paddle
        game.physics.arcade.collide(ball, paddle);

        // collide with blocks
        game.physics.arcade.collide(ball, Blocks.blocks);

        if (Blocks.countAlive() === 0) {

            // just set up another set for now
            Blocks.setupDataObjects();

        }

        // text display
        game.world.getByName('text-0').text = 'ball-velocity: ' + ball.body.velocity.x + ',' + ball.body.velocity.y;
        game.world.getByName('text-1').text = 'ball-position: ' + Math.floor(ball.x) + ',' + Math.floor(ball.y);
        game.world.getByName('text-2').text = 'blocks alive: ' + Blocks.countAlive();
    }

});
