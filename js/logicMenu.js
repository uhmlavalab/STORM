

/**
Handles all preparation for menu switching
*/
function prepAndSwitchToMenu() {
	gameState = gsMenu;
	stageTimeStart = Date.now();

	//TODO load scores.

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

