/***********
title.js

Just a reminder of what this file is for

 * TITLE STATE - the title screen state

 ***********/

game.state.add('title', {

    create: function () {

        // make game sprites not visible
        Blocks.blocks.visible = false;
        Paddle.paddle.visible = false;
        Ball.ball.visible = false;

        // crude title for now at least
        var font = {
            fill: 'white',
            font: '20px courier'
        };
        var text = game.add.text(game.world.centerX, 32, 'Phaser Breakout', font);
        text.anchor.set(0.5, 0.5);

        game.input.onDown.add(function () {

            text.destroy();
            game.state.start('game', false, false);

        });

        var cursors = this.cursors = game.input.keyboard.createCursorKeys();

        cursors.up.onDown.add(function () {

            text.destroy();
            game.state.start('game', false, false);

        });

    }

});
