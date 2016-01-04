
/**
Handles all preparation needed for game.
*/
function prepAndSwitchToGame(level) {
	gameState = gsGame;
	stageTimeStart = Date.now();

	//reset entities
	for ( var i = 0; i < allInvaders.length; i++) { allInvaders[i].death(); }
	for ( var i = 0; i < allPlayers.length; i++) { allPlayers[i].death(); }
	for ( var i = 0; i < allShots.length; i++) { allShots[i].death(); }
	for ( var i = 0; i < allExplosions.length; i++) { allExplosions[i].death(); }
	//spawn two players
	allPlayers[0].spawnAt( cCanvasWidth/10, cCanvasHeight/5 );
	allPlayers[1].spawnAt( cCanvasWidth/10, cCanvasHeight/5 * 2 );
	//randomize background.
	var rx, ry, vis, s1, s2, s3;
	for(var i = 0; i < 4; i++) {
		rx = parseInt( Math.random() * cCanvasWidth );
		ry = parseInt( Math.random() * cCanvasHeight );
		switch( i ) {
			case 0:
				vis = 'hole';
				rx = cCanvasWidth;
				break;
			case 1: vis = 'p1'; break;
			case 2: vis = 'p2'; break;
			case 3: vis = 'p3'; break;
			default: consolePrint( "Unknown background element ", "exit");
		}
		//because these images are coordinate based top left.
		allGameVisuals.bgLayer[vis].x( rx );
		allGameVisuals.bgLayer[vis].y( ry );
	}
	//randomize stars
	s1 = parseInt( Math.random() * 3 );
	do { s2 = parseInt( Math.random() * 3 ); }
	while( s2 === s1 );
	do { s3 = parseInt( Math.random() * 3 ); }
	while( s3 === s1 || s3 === s2 );
	allGameVisuals.bgLayer['s1'].x( cCanvasWidth * s1 );
	allGameVisuals.bgLayer['s2'].x( cCanvasWidth * s2 );
	allGameVisuals.bgLayer['s3'].x( cCanvasWidth * s3 );
	//reset the game over
	allGameVisuals.frontLayer.gameover.y( -1 * allGameVisuals.frontLayer.gameover.height() );
	gameVars.canRespawn = true;

	//load levels
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
		else if( gameVars.canRespawn && allPlayers[i].readyToRespawn && isKeyboardKeyDown( playerControls[i].shoot ) ) {
				allPlayers[i].respawn();
		}
	}

	if( !gameVars.canRespawn && keyboardKeys["Enter"] === "down" ) {
		keyboardKeys["Enter"] = 'none';
		prepAndSwitchToResult();
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
	//update background stars
	allGameVisuals.bgLayer['s1'].x( allGameVisuals.bgLayer['s1'].x() - cBgStarMoveSpeed );
	allGameVisuals.bgLayer['s2'].x( allGameVisuals.bgLayer['s2'].x() - cBgStarMoveSpeed );
	allGameVisuals.bgLayer['s3'].x( allGameVisuals.bgLayer['s3'].x() - cBgStarMoveSpeed );
	if( allGameVisuals.bgLayer['s1'].x() < -cCanvasWidth ) { allGameVisuals.bgLayer['s1'].x( 2 * cCanvasWidth); }
	if( allGameVisuals.bgLayer['s2'].x() < -cCanvasWidth ) { allGameVisuals.bgLayer['s2'].x( 2 * cCanvasWidth); }
	if( allGameVisuals.bgLayer['s3'].x() < -cCanvasWidth ) { allGameVisuals.bgLayer['s3'].x( 2 * cCanvasWidth); }
	//rotate the hole
	allGameVisuals.bgLayer.hole.rotate(0.01);
	
	//check for gameover
	if( gameVars.canRespawn) {
		var allDead = true;
		for(var i = 0; i < allPlayers.length; i++) {
			if(allPlayers[i].isAlive) { allDead = false; break;}
		}
		if(allDead) { gameVars.canRespawn = false; }
	}
	//see if need to move the sign
	else if ( allGameVisuals.frontLayer.gameover.y() < cCanvasHeight/5 * 2) {
		allGameVisuals.frontLayer.gameover.y( allGameVisuals.frontLayer.gameover.y() + gameVars.goSpeed );
	}

} //end logicGame
