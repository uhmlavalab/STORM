

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



	//randomize background
	var rx, ry, vis, s1, s2, s3;
	for(var i = 1; i < 4; i++) {
		rx = parseInt( Math.random() * cCanvasWidth * 2 );
		ry = parseInt( Math.random() * cCanvasHeight );
		switch( i ) {
			case 1: vis = 'p1'; break;
			case 2: vis = 'p2'; break;
			case 3: vis = 'p3'; break;
			default: consolePrint( "Unknown background element ", "exit");
		}
		//because these images are coordinate based top left.
		allResultVisuals.bgLayer[vis].x( rx );
		allResultVisuals.bgLayer[vis].y( ry );
	}
	//randomize stars
	s1 = parseInt( Math.random() * 3 );
	do { s2 = parseInt( Math.random() * 3 ); }
	while( s2 === s1 );
	do { s3 = parseInt( Math.random() * 3 ); }
	while( s3 === s1 || s3 === s2 );
	allResultVisuals.bgLayer['s1'].x( cCanvasWidth * s1 );
	allResultVisuals.bgLayer['s2'].x( cCanvasWidth * s2 );
	allResultVisuals.bgLayer['s3'].x( cCanvasWidth * s3 );


	//setup speed of background controls
	resultVars.starMoveSpeed = 0.5;
	resultVars.planetMoveSpeed = 1;


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
		else if( (action === "right") && (resultVars[ "blockp" + i] < 4) ) {
			resultVars[ "blockp" + i] += 1;
			allResultVisuals.frontLayer["player" + (i+1) + "block"].x(
				allResultVisuals.midLayer["player" + (i+1) + "c1" ].x()
				+ ( (resultVars[ "blockp" + i] - 1) * allResultVisuals.frontLayer["player" + (i+1) + "block"].width()  )
			);
		}

	} //end for each player




	//End the input to submit scores.
	if(keyboardKeys["Enter"] === "down") {

		resultScoreCheckingBeforePageReload();

		document.location.reload(true);
	}

} //end inputResult

/**
Handles logic for result.
*/
function logicResult() {

	//blink
	resultVars.blinkCounter += dTime;
	if( resultVars.blinkCounter >= resultVars.blinkDuration ) {
		resultVars.blinkCounter = 0;
		for(var i=0; i<allPlayers.length; i++) {
			if( allResultVisuals.midLayer["player" + (i+1) + "Title"].visible() ) {
				allResultVisuals.frontLayer["player" + (i+1) + "block"].visible( ! allResultVisuals.frontLayer["player" + (i+1) + "block"].visible() );
			}
		}
	}

	//move stars and planets
	for ( var i=1; i < 4; i++ ) {
		allResultVisuals.bgLayer[ "s" + i ].x( allResultVisuals.bgLayer[ "s" + i ].x() - resultVars.starMoveSpeed);
		if( allResultVisuals.bgLayer['s' + i].x() < -cCanvasWidth )
			{ allResultVisuals.bgLayer['s' + i].x( 2 * cCanvasWidth); }

		allResultVisuals.bgLayer[ "p" + i ].x( allResultVisuals.bgLayer[ "p" + i ].x() - resultVars.planetMoveSpeed);
		if( allResultVisuals.bgLayer['p' + i].x() < -cCanvasWidth/2 ) {
			allResultVisuals.bgLayer['p' + i].x( cCanvasWidth + parseInt( Math.random() * cCanvasWidth * 2 ) );
			allResultVisuals.bgLayer['p' + i].y( parseInt( Math.random() * cCanvasHeight ) );
		}
	}

} //end logicResult

/**
Goes through the current high scores to see if anything needs to be replaced.
*/
function resultScoreCheckingBeforePageReload() {
	var playerScoresThisGame = [];
		playerScoresThisGame.push(0);
		playerScoresThisGame.push(0);
		playerScoresThisGame.push(0);
	var playerNamesThisGame = [];
		playerNamesThisGame.push("AAA");

	//first grab names from the input field.
	for(var i=0; i < allPlayers.length; i++) {
		allPlayers[i].inputName = 
			allResultVisuals.midLayer["player" + (i+1) + "c1"].text()
			+ allResultVisuals.midLayer["player" + (i+1) + "c2"].text()
			+ allResultVisuals.midLayer["player" + (i+1) + "c3"].text();
	}

	playerScoresThisGame[0] = allPlayers[0].score;
	playerNamesThisGame[0] = allPlayers[0].inputName;

	for(var i=1; i < allPlayers.length; i++) {
		if ( allPlayers[i].score >= playerScoresThisGame[0] ) {
			playerScoresThisGame[2] = playerScoresThisGame[1];
			playerNamesThisGame[2] = playerNamesThisGame[1];
			playerScoresThisGame[1] = playerScoresThisGame[0];
			playerNamesThisGame[1] = playerNamesThisGame[0];

			playerScoresThisGame[0] = allPlayers[i].score;
			playerNamesThisGame[0] = allPlayers[i].inputName;
		}
		else if ( allPlayers[i].score >= playerScoresThisGame[1] ) {
			playerScoresThisGame[2] = playerScoresThisGame[1];
			playerNamesThisGame[2] = playerNamesThisGame[1];

			playerScoresThisGame[1] = allPlayers[i].score;
			playerNamesThisGame[1] = allPlayers[i].inputName;
		}
		else if ( allPlayers[i].score >= playerScoresThisGame[2] ) {
			playerScoresThisGame[2] = allPlayers[i].score;
			playerNamesThisGame[2] = allPlayers[i].inputName;
		}
	}

	for (var i = 0; i < 3 ; i++ ) {
		if(playerScoresThisGame[i] > highScores.score1) {
			highScores.score3 = highScores.score2;
			highScores.name3 = highScores.name2;
			highScores.score2 = highScores.score1;
			highScores.name2 = highScores.name1;

			highScores.score1 = playerScoresThisGame[i];
			highScores.name1 = playerNamesThisGame[i];
		}
		else if(playerScoresThisGame[i] > highScores.score2) {
			highScores.score3 = highScores.score2;
			highScores.name3 = highScores.name2;
			highScores.score2 = playerScoresThisGame[i];
			highScores.name2 = playerNamesThisGame[i];
		}
		else if(playerScoresThisGame[i] > highScores.score3) {
			highScores.score3 = playerScoresThisGame[i];
			highScores.name3 = playerNamesThisGame[i];
		}

	}

	document.cookie = "score1=" + highScores.score1;
	document.cookie = "name1=" + highScores.name1;

	document.cookie = "score2=" + highScores.score2;
	document.cookie = "name2=" + highScores.name2;

	document.cookie = "score3=" + highScores.score3;
	document.cookie = "name3=" + highScores.name3;

}

