game.state.add('boot', {

    create: function () {

        // scale settings
        var scale = this.game.scale;

        scale.compatibility.scrollTo = false;
        scale.pageAlignHorizontally = true;
        scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        scale.width = document.getElementById(game.parent).scrollWidth;
        scale.height = document.getElementById(game.parent).scrollHeight;

        // disable antialias
        game.antialias = false;

        // will be using physics
        game.physics.startSystem(Phaser.Physics.ARCADE);

        game.state.start('mksheets');

    }

});
