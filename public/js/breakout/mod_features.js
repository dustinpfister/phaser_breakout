var Features = {

    // to be called each time the players score goes
    // up during a game
    onScore: function () {

        var data = this.game.data;

        data.lives_won = Math.floor(data.score / 1000);

        data.lives = data.lives_start + data.lives_won - data.lives_lost;

    },

    // set up features for a new game
    onGameStart: function () {

        var data = this.game.data;

        data.lives = data.lives_start + data.lives_won - data.lives_lost;

    },

    onBallLost: function () {

        var data = this.game.data;

        data.lives_lost += 1;

        data.lives = data.lives_start + data.lives_won - data.lives_lost;

    }

};
