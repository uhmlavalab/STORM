

/**
Handles all preparation for result switching
*/
function prepAndSwitchToResult() {
	gameState = gsResult;
	stageTimeStart = Date.now();

	//Show score input only if a player has points.
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
	resultVars.disableInput = false;
	//if no players have points, then disable name input.
	if(hideCount === allPlayers.length) {
		resultVars.disableInput = true;
		allResultVisuals.midLayer.winner.text("Pres Enter to return to main menu");
	}
	//set block blink speed variables
	resultVars.blinkCounter = 0;
	resultVars.blinkDuration = 400;

	//set vars for player block control
	for(var i=0; i < allPlayers.length; i++) {
		resultVars[ "blockp" + i] = 1; //start on the first char
		resultVars[ "c1p" + i] = 'A'.charCodeAt();
		resultVars[ "c2p" + i] = 'A'.charCodeAt();
		resultVars[ "c3p" + i] = 'A'.charCodeAt();
	}
	resultVars.ccAref = 'A'.charCodeAt();
	resultVars.ccZref = 'Z'.charCodeAt();

	placeScreenVisuals(allResultVisuals);
} //end prepAndSwitchToMenu


//-----------------------------------------------------------------------------------------------------------

/**
Handles input for result.
*/
function inputResult() {

	var action = "none";

	for(var i=0; i < allPlayers.length; i++) {
		if( isKeyboardKeyDown( playerControls[i].up ) )
			{ keyboardKeys[ playerControls[i].up ] = "none"; action = "up";  }
		else if( isKeyboardKeyDown( playerControls[i].gc_up ) )
			{ keyboardKeys[ playerControls[i].gc_up ] = "none"; action = "up";  }

		else if( isKeyboardKeyDown( playerControls[i].down ) )
			{ keyboardKeys[ playerControls[i].down ] = "none"; action = "down";  }
		else if( isKeyboardKeyDown( playerControls[i].gc_down ) )
			{ keyboardKeys[ playerControls[i].gc_down ] = "none"; action = "down";  }
		
		else if( isKeyboardKeyDown( playerControls[i].left ) )
			{ keyboardKeys[ playerControls[i].left ] = "none"; action = "left";  }
		else if( isKeyboardKeyDown( playerControls[i].gc_left ) )
			{ keyboardKeys[ playerControls[i].gc_left ] = "none"; action = "left";  }
		
		else if( isKeyboardKeyDown( playerControls[i].right ) )
			{ keyboardKeys[ playerControls[i].right ] = "none"; action = "right";  }
		else if( isKeyboardKeyDown( playerControls[i].gc_right ) )
			{ keyboardKeys[ playerControls[i].gc_right ] = "none"; action = "right";  }

		//only char change if over a char
		if( resultVars[ "blockp" + i] < 4) {
			if( action === "up") {
				resultVars[ "c" + resultVars[ "blockp" + i] + "p" + i] += 1;
				if( resultVars.ccZref < resultVars[ "c" + resultVars[ "blockp" + i] + "p" + i] )
					{ resultVars[ "c" + resultVars[ "blockp" + i] + "p" + i] = resultVars.ccAref; }
			}
			if( action === "down") {
				resultVars[ "c" + resultVars[ "blockp" + i] + "p" + i] -= 1;
				if( resultVars.ccAref > resultVars[ "c" + resultVars[ "blockp" + i] + "p" + i] )
					{ resultVars[ "c" + resultVars[ "blockp" + i] + "p" + i] = resultVars.ccZref; }
			}
			allResultVisuals.midLayer["player" + (i+1) + "c" + resultVars[ "blockp" + i] ].text(
				String.fromCharCode( resultVars[ "c" + resultVars[ "blockp" + i] + "p" + i] )
			);
		}//end if changing a char

		//move the block
		if( (action === "left") && (resultVars[ "blockp" + i] > 1) ) {
			resultVars[ "blockp" + i] -= 1;
			allResultVisuals.frontLayer["player" + (i+1) + "block"].x( allResultVisuals.midLayer["player" + (i+1) + "c" + resultVars[ "blockp" + i] ].x() );
		}
		else if( (action === "left") && (resultVars[ "blockp" + i] < 4) ) {
			resultVars[ "blockp" + i] += 1;
			allResultVisuals.frontLayer["player" + (i+1) + "block"].x(
				allResultVisuals.midLayer["player" + (i+1) + "c" + resultVars[ "blockp" + i] ].x()
				+ (resultVars[ "blockp" + i] * allResultVisuals.frontLayer["player" + (i+1) + "block"].width()  )
			);
		}

	} //end for each player




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

