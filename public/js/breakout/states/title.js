/***********
title.js

Just a reminder of what this file is for

 * TITLE STATE - the title screen state
 * PLAY OPTION - option to drop into the game state, and play the game
 * UPGRADES OPTION - option to go to the upgrades menu

 ***********/

game.state.add('title', {

    create: function () {

	    
	
	
        game.state.start('game', false, false);

    }

});
