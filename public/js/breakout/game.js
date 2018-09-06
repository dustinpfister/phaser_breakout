// the main game variable
var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');

game.data = {

    frameData: {},
    score: 0,

    lives: 0, // will be set by formula in mod_features
    lives_start: 3,
    lives_won: 0,
    lives_lost: 0,

    round: 1,
    ballSpeed: 100

};
