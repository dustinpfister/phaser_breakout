/***********
Upgrades.js

Just a reminder of what this file is for

 * STORES STATE OF UPGRADES
 * Holds methods that set variables in features.js

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

                Features.ballSpeedBase = (30.2 - 25 * per);

            }

        }

    },

    setUpgrade: function () {}

};
