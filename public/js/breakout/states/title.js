/***********
title.js

Just a reminder of what this file is for

 * TITLE STATE - the title screen state
 * PLAY OPTION - option to drop into the game state, and play the game
 * UPGRADES OPTION - option to go to the upgrades menu

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

        //game.state.start('game', false, false);

    }

});
