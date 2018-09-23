var Features = {

    //round
    round: 1,

    // score
    perBlockHit: 10,
    perBlockKill: 25,

    // ball values
    ballBlockHits: 0, // used with speed formula
    ballDamage: 3,
    ballSpeed: 10,

    // paddle
    paddleAngle: 75, // max angle range from center to left or right in degrees

    /********** FEATURES **********/

    // set the current round
    setRound: function (round) {

        Features.round = round;
        Features.ballBlockHits = 0;

        Features.setBallSpeed();

    },

    // ball speed formula
    setBallSpeed: function () {

        Features.ballSpeed = 200 + 50 * (Features.round - 1);

    },

    /********** EVENTS **********/

    /********** SCORE EVENTS **********/

    // each time a block is hit
    onBlockHit: function (sprite) {

        // block hits
        Features.ballBlockHits += 1;

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

    /********** GAME EVENTS **********/

    // set up features for a new game
    onGameStart: function () {

        var data = this.game.data;

        data.lives = data.lives_start + data.lives_won - data.lives_lost;

    },

    onRoundStart: function () {},

    /********** BALL EVENTS **********/

    // each time the player looses a ball
    onBallLost: function () {

        var data = this.game.data;

        data.lives_lost += 1;

        data.lives = data.lives_start + data.lives_won - data.lives_lost;

    },

    /********** PADDLE EVENTS **********/

    // when the ball collides with the paddle
    onPaddleBallCollide: function (paddle, ball, per, dir, fromCenter) {

        var a = -Math.PI / 2 - Math.PI / 180 * Features.paddleAngle * per * dir;

        //x = Math.floor(Math.cos(a) * game.data.ballSpeed);
        //y = Math.floor(Math.sin(a) * game.data.ballSpeed);

        x = Math.floor(Math.cos(a) * Features.ballSpeed);
        y = Math.floor(Math.sin(a) * Features.ballSpeed);

        ball.body.velocity.set(x, y);

    }

};
