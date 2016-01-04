

/**
Handles all preparation for menu switching
*/
function prepAndSwitchToMenu() {
	gameState = gsMenu;
	stageTimeStart = Date.now();

	//show highScores
	allMenuVisuals.midLayer.topScore1.text( highScores.name1 + " " + highScores.score1 );
	allMenuVisuals.midLayer.topScore2.text( highScores.name2 + " " + highScores.score2 );
	allMenuVisuals.midLayer.topScore3.text( highScores.name3 + " " + highScores.score3 );

	placeScreenVisuals(allMenuVisuals);

} //end prepAndSwitchToMenu


//-----------------------------------------------------------------------------------------------------------

/**
Handles input for menu.
*/
function inputMenu() {
	for( var key in keyboardKeys) {
		if(keyboardKeys[key] === 'down') {
			debugPrint( key + ":" + keyboardKeys[key], "menu");
			//keyboardKeys[key] = 'none';
		}
	}

	if( isKeyboardKeyDown('13') || isKeyboardKeyDown('Enter') ) {
		prepAndSwitchToGame();
	}

} //end inputMenu

/**
Handles logic for Testing.
*/
function logicMenu() {

}

