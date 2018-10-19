/***********
plugin_sliders.js

A phaser ce plug in that is used to create a pool of reusable buttons for game menus

 ***********/
var Plugin_Sliders = function (game, opt) {

    var plug = new Phaser.Plugin(game, game.plugins);

    var createButtonSheet = function (game) {
        var canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d');
        canvas.width = 64;
        canvas.height = 32;
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, 16, 16);
        game.cache.addSpriteSheet('sheet-slider-button', null, canvas, 16, 16, 1, 0, 0);
    };

    // call once
    plug.init = function (opt) {

        // create or append game.data
        //game.data = game.data || {};
        //game.data.ball = {};

        // start or reset Arcade physics
        game.physics.startSystem(Phaser.Physics.ARCADE);

        createButtonSheet(game);

    };

    // add the plugin to the game
    game.plugins.add(plug, opt);

};
