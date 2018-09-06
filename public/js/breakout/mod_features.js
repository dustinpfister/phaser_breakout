var Features = {

    // to be called each time the players score goes
    // up during a game
    onScore: function () {

        console.log('score: ' + this.game.data.score);

    },

    // set up features for a new game
    onGameStart: function () {

        var data = this.game.data;

        data.lives = data.lives_start + data.lives_won - data.lives_lost;

    }

};
