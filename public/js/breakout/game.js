// the main game variable
var game = new Phaser.Game(320, 240, Phaser.AUTO, 'gamearea');

game.data = {

    frameData: {},
    score: 0,
    lives: 3,
    round: 1,
    ballSpeed: 100

};
