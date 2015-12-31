
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

	allPlayers[0].spawnAt( cCanvasWidth/5, cCanvasHeight - 100 );
	allPlayers[1].spawnAt( cCanvasWidth/5 * 2, cCanvasHeight - 100 );

	if(level === null) {
		level = "L01";
	}

	//TODO process data for level loading.


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
	if( keyboardKeys["w"] === "down" ) { allPlayers[0].moveDirection = "up"; }
	else if( keyboardKeys["s"] === "down" ) { allPlayers[0].moveDirection = "down"; }
	if( keyboardKeys["a"] === "down" ) { allPlayers[0].moveDirection += "left"; }
	else if( keyboardKeys["d"] === "down" ) { allPlayers[0].moveDirection += "right"; }


	if( keyboardKeys["i"] === "down" ) { allPlayers[1].moveDirection = "up"; }
	else if( keyboardKeys["k"] === "down" ) { allPlayers[1].moveDirection = "down"; }
	if( keyboardKeys["j"] === "down" ) { allPlayers[1].moveDirection += "left"; }
	else if( keyboardKeys["l"] === "down" ) { allPlayers[1].moveDirection += "right"; }


	if( keyboardKeys["c"] === "down" ) { keyboardKeys["c"] = "none"; allPlayers[0].tryShoot = true; }
	if( keyboardKeys["n"] === "down" ) { keyboardKeys["n"] = "none"; allPlayers[1].tryShoot = true; }

} //inputGame

/**
Handles logic for game.
*/
function logicGame() {

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

	for( var i = 0; i < allPlayers.length; i++ ) {
		allGameVisuals.frontLayer[ ("p"+(i+1)+"nameOutline") ].x( allPlayers[i].x - 1 - allGameVisuals.frontLayer[ ("p"+(i+1)+"nameOutline") ].getTextWidth()/2 );
		allGameVisuals.frontLayer[ ("p"+(i+1)+"nameOutline") ].y( allPlayers[i].y + allPlayers[i].height/2 - 1);
		allGameVisuals.frontLayer[ ("p"+(i+1)+"name") ].x( allPlayers[i].x - allGameVisuals.frontLayer[ ("p"+(i+1)+"nameOutline") ].getTextWidth()/2 );
		allGameVisuals.frontLayer[ ("p"+(i+1)+"name") ].y( allPlayers[i].y + allPlayers[i].height/2 );

		allGameVisuals.frontLayer[ ("p"+(i+1)+"scoreOutline") ].x( allPlayers[i].x - 1 - allGameVisuals.frontLayer[ ("p"+(i+1)+"scoreOutline") ].getTextWidth()/2 );
		allGameVisuals.frontLayer[ ("p"+(i+1)+"scoreOutline") ].y( allPlayers[i].y + allPlayers[i].height/2 - 1 + allGameVisuals.frontLayer[ ("p"+(i+1)+"scoreOutline") ].getTextHeight() );
		allGameVisuals.frontLayer[ ("p"+(i+1)+"scoreSub") ].x( allPlayers[i].x - allGameVisuals.frontLayer[ ("p"+(i+1)+"scoreOutline") ].getTextWidth()/2 );
		allGameVisuals.frontLayer[ ("p"+(i+1)+"scoreSub") ].y( allPlayers[i].y + allPlayers[i].height/2 + allGameVisuals.frontLayer[ ("p"+(i+1)+"scoreOutline") ].getTextHeight() );

		allGameVisuals.frontLayer[ ("p"+(i+1)+"scoreOutline") ].text("Score:"+allPlayers[i].score);
		allGameVisuals.frontLayer[ ("p"+(i+1)+"scoreSub") ].text("Score:"+allPlayers[i].score);
	}

} //end logicGame
