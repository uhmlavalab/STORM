

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
		allMenuVisuals.bgLayer[vis].x( rx );
		allMenuVisuals.bgLayer[vis].y( ry );
	}
	//randomize stars
	s1 = parseInt( Math.random() * 3 );
	do { s2 = parseInt( Math.random() * 3 ); }
	while( s2 === s1 );
	do { s3 = parseInt( Math.random() * 3 ); }
	while( s3 === s1 || s3 === s2 );
	allMenuVisuals.bgLayer['s1'].x( cCanvasWidth * s1 );
	allMenuVisuals.bgLayer['s2'].x( cCanvasWidth * s2 );
	allMenuVisuals.bgLayer['s3'].x( cCanvasWidth * s3 );


	//setup speed of background controls
	menuVars.starMoveSpeed = 0.5;
	menuVars.planetMoveSpeed = 1;



	placeScreenVisuals(allMenuVisuals);

} //end prepAndSwitchToMenu


//-----------------------------------------------------------------------------------------------------------

/**
Handles input for menu.
*/
function inputMenu() {
	inputMenuPad();

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

//-----------------------------------------------------------------------------------------------------------

function inputMenuPad() {
	var gamepads = navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads : []);
	//var gamepads = navigator.getGamepads();
	if (gamepads === null || gamepads === undefined) {
		return;
	}

	for (var i = 0 ; i < gamepads[0].buttons.length ; i++) {
		if ( gamepads[i].buttons ) {
			for (var j = 0 ; j < gamepads[1].buttons.length ; j++) {
				if ( gamepads[i].buttons ) {
					keyboardKeys['Enter'] = down;
					return;
				}
			}
		}
	}
} //end inputMenuPad


//-----------------------------------------------------------------------------------------------------------

/**
Handles logic for Testing.
*/
function logicMenu() {

	//move stars and planets
	for ( var i=1; i < 4; i++ ) {
		allMenuVisuals.bgLayer[ "s" + i ].x( allMenuVisuals.bgLayer[ "s" + i ].x() - menuVars.starMoveSpeed);
		if( allMenuVisuals.bgLayer['s' + i].x() < -cCanvasWidth )
			{ allMenuVisuals.bgLayer['s' + i].x( 2 * cCanvasWidth); }

		allMenuVisuals.bgLayer[ "p" + i ].x( allMenuVisuals.bgLayer[ "p" + i ].x() - menuVars.planetMoveSpeed);
		if( allMenuVisuals.bgLayer['p' + i].x() < -cCanvasWidth/2 ) {
			allMenuVisuals.bgLayer['p' + i].x( cCanvasWidth + parseInt( Math.random() * cCanvasWidth * 2 ) );
			allMenuVisuals.bgLayer['p' + i].y( parseInt( Math.random() * cCanvasHeight ) );
		}
	}

}

