
/**
Handles all preparation needed for game.
*/
function prepAndSwitchToGame(level) {
	gameState = gsGame;
	stageTimeStart = Date.now();

	for ( var i = 0; i < allInvaders.length; i++) { allInvaders[i].death(); }
	for ( var i = 0; i < allPlayers.length; i++) { allPlayers[i].death(); }
	for ( var i = 0; i < allShots.length; i++) { allShots[i].death(); }
	for ( var i = 0; i < allExplosions.length; i++) { allExplosions[i].death(); }

	allPlayers[0].spawnAt( cCanvasWidth/10, cCanvasHeight/5 );
	allPlayers[1].spawnAt( cCanvasWidth/10, cCanvasHeight/5 * 2 );

	if(level === undefined) {
		level = Level01Commands;
	}
	commandProcessing.loadList(level);


	placeScreenVisuals(allGameVisuals);

} //end prepAndSwitchToGame


//-----------------------------------------------------------------------------------------------------------

/**
Handles input for game.
*/
function inputGame() {
	//first clear out all move directions to prevent always moving.
	for(var i = 0; i < allPlayers.length; i++) {
		allPlayers[i].moveDirection = "none";
	}

	for(var i = 0; i < allPlayers.length; i++) {

		if(allPlayers[i].isAlive) {
			if( isKeyboardKeyDown( playerControls[i].up ) ) { allPlayers[i].moveDirection = "up"; }
			else if( isKeyboardKeyDown( playerControls[i].down ) ) { allPlayers[i].moveDirection = "down"; }
			if( isKeyboardKeyDown( playerControls[i].left ) ) { allPlayers[i].moveDirection += "left"; }
			else if( isKeyboardKeyDown( playerControls[i].right ) ) { allPlayers[i].moveDirection += "right"; }

			if( isKeyboardKeyDown( playerControls[i].shoot )) {
				keyboardKeys[ playerControls[i].shoot ] = "none";
				allPlayers[i].tryShoot = true;
			}
		}
		else if( allPlayers[i].readyToRespawn && isKeyboardKeyDown( playerControls[i].shoot ) ) {
				allPlayers[i].respawn();
		}
	}

} //inputGame

/**
Handles logic for game.
*/
function logicGame() {

	//process commands
	commandProcessing.handleTimingOfCommands();

	//update everything alive
	for(var i = 0; i < allEntitiesToUpdate.length; i++) {
		allEntitiesToUpdate[i].update();
	}

	//collision detect on everything alive.
	for(var i = 0; i < allEntitiesToUpdate.length; i++) {
		for(var j = i + 1; j < allEntitiesToUpdate.length; j++) {
			allEntitiesToUpdate[i].collisionEffects( allEntitiesToUpdate[j] );
			allEntitiesToUpdate[j].collisionEffects( allEntitiesToUpdate[i] );
		}
	}


} //end logicGame
