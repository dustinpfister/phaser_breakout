/***********
Upgrades.js

Just a reminder of what this file is for

 * EXP SYSTEM
 * STATE OF UPGRADES

 ***********/

var Upgrades = {

    exp: 0,

    points: 6,

    upgrades: {

        // reduce the base speed of the ball, that gets raised with each round
        BallSpeedBaseReduce: {

            points: 10,
            pointsMax: 10,

            // set the values in features.js
            set: function () {

                var per = this.points / this.pointsMax;

                console.log(this);

                Features.ballSpeedBase = (30.2 - 25 * per);

                console.log(Features.ballSpeedBase)

            }

        }

    },

    setUpgrade: function () {}

};
