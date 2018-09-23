var Features = {

    perBlockHit: 10,
    perBlockKill: 25,

    // ball values
    ballDamage: 3,

    // each time a block is hit
    onBlockHit: function (sprite) {

        // block hp is always lost
        sprite.data.hp -= Features.ballDamage;

        if (sprite.data.hp <= 0) {

            sprite.data.hp = 0;
            sprite.body.enable = false;
            sprite.alpha = 0;

            Features.onBlockKill(sprite);

        } else {

            sprite.frame = Math.floor(sprite.data.hp - 1);

        }

        sprite.game.data.score += Features.perBlockHit;
        Features.onScore(sprite.game);

    },

    // each time a block is killed
    onBlockKill: function (sprite) {

        sprite.game.data.score += Features.perBlockKill;
        Features.onScore(sprite.game);

    },

    // to be called each time the players score goes
    // up during a game
    onScore: function (game) {

        var data = game.data;

        data.lives_won = Math.floor(data.score / 1000);

        data.lives = data.lives_start + data.lives_won - data.lives_lost;

    },

    // set up features for a new game
    onGameStart: function () {

        var data = this.game.data;

        data.lives = data.lives_start + data.lives_won - data.lives_lost;

    },

    // each time the player looses a ball
    onBallLost: function () {

        var data = this.game.data;

        data.lives_lost += 1;

        data.lives = data.lives_start + data.lives_won - data.lives_lost;

    }

};
