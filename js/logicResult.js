

/**
Handles all preparation for result switching
*/
function prepAndSwitchToResult() {
	gameState = gsResult;
	stageTimeStart = Date.now();

	var hideCount = 0;
	for(var i=0; i<allPlayers.length; i++) {
		if(allPlayers[i].score <= 0) {
			hideCount++;

			allResultVisuals.midLayer["player" + (i+1) + "Title"].visible(false);
			allResultVisuals.midLayer["player" + (i+1) + "c1"].visible(false);
			allResultVisuals.midLayer["player" + (i+1) + "c2"].visible(false);
			allResultVisuals.midLayer["player" + (i+1) + "c3"].visible(false);
			allResultVisuals.midLayer["player" + (i+1) + "score"].visible(false);
			allResultVisuals.frontLayer["player" + (i+1) + "block"].visible(false);
		}
		else {
			allResultVisuals.midLayer["player" + (i+1) + "score"].text( "Score:" + allPlayers[i].score );
		}
	}
	if(hideCount === allPlayers.length) {
		allResultVisuals.midLayer.winner.text("Pres Enter to return to main menu");
	}

	resultVars.blinkCounter = 0;
	resultVars.blinkDuration = 400;

	placeScreenVisuals(allResultVisuals);
} //end prepAndSwitchToMenu


//-----------------------------------------------------------------------------------------------------------

/**
Handles input for result.
*/
function inputResult() {




	if(keyboardKeys["Enter"] === "down") { document.location.reload(true); }

} //end inputResult

/**
Handles logic for result.
*/
function logicResult() {

	resultVars.blinkCounter += dTime;
	if( resultVars.blinkCounter >= resultVars.blinkDuration ) {
		resultVars.blinkCounter = 0;
		for(var i=0; i<allPlayers.length; i++) {
			if( allResultVisuals.midLayer["player" + (i+1) + "Title"].visible() ) {
				allResultVisuals.frontLayer["player" + (i+1) + "block"].visible( ! allResultVisuals.frontLayer["player" + (i+1) + "block"].visible() );
			}
		}
	}

} //end logicResult

