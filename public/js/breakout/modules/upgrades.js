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

        // BALL SPEED
        {
            name: 'Ball Speed Base Reduce',
            desc: 'Reduces the base speed of the ball to begin with that is then raised via other factors',
            points: 0,
            pointsMax: 100,
            set: function () {
                Features.ballSpeedBase = 30.2 - 25 * this.per;
            }
        }, {
            name: 'Increase ball speed block hits',
            desc: 'Reduces Ball speed by increasing the number of block hits needed to reach the full block hit speed multiplier',
            points: 0,
            pointsMax: 100,
            set: function () {
                Features.ballBlockHitOverHits = Math.floor(10 + 990 * this.per);
            }
        }, {
            name: 'Reduce ball speed block hit multiplier',
            desc: 'Reduces Ball speed by reducing the max speed multiplier that is in effect for block hits',
            points: 0,
            pointsMax: 100,
            set: function () {
                Features.ballBlockHitMulti = 0.8 - 0.65 * this.per;
            }
        }
    ],

    // set all the upgrades with there current point values
    setAllUpgrades: function () {

        Upgrades.upgrades.forEach(function (upgrade) {

            upgrade.set.call({

                per: upgrade.points / upgrade.pointsMax

            });

        })

    }

};
