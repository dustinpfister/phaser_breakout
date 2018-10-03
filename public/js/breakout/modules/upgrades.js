/***********
Upgrades.js

Just a reminder of what this file is for

 * STORES STATE OF UPGRADES
 * Holds methods that set variables in features.js

 ***********/

var Upgrades = {

    exp: 0,

    points: 6,

    upgrades: [

        // reduce the base speed of the ball, that gets raised with each round
        {

            desc: 'Ball Speed Base Reduce',
            points: 0,
            pointsMax: 10,

            // set the values in features.js
            set: function () {

                var per = this.points / this.pointsMax;

                Features.ballSpeedBase = (30.2 - 25 * per);

            }

        }

    ],

    // set all the upgrades with there current point values
    setAllUpgrades: function () {

        Upgrades.upgrades.forEach(function (upgrade) {

            upgrade.set();

        })

    }

};
