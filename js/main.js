

/*
This should be the first function to activate.

*/
function main() {
	console.log("Starting");

	keyboardBinder(); //backup for testing without gc. see bottom of file for description on usage.
	mouseBinder();

	setupKonvaCanvas();
	setupSpriteImageObjects();

	// stupidCookies();

	setupMenuVisuals();
	setupGameVisuals();
	// setupResultVisuals();




	prepAndSwitchToMenu();
	//prepAndSwitchToTest(); //only one prep and switch should be active




	setInterval(mainUpdater, cMainUpdaterInterval); //start the main update
	console.log("Done");
} //end main




/*
This is the update loop.
*/
function mainUpdater() {


	switch(gameState) {
		case gsTest:
			inputTest();
			logicTest();
			break;
		case gsMenu:
			inputMenu();
			logicMenu();
			break;
		case gsGame:
			inputGame();
			logicGame();
			break;
		// case gsResult:
		// 	inputResult();
		// 	logicResult();
		// 	break;
		default:
			consolePrint('Error: unknown game state:' + gameState, "exit");
			break;
	}
	//update time;
	dTime = Date.now() - stageTimeStart - stageTime;
	stageTime = Date.now() - stageTimeStart;
	stage.draw();
} //end mainUpdater




//------------------------------------------------------------------------------------------------------
/*
This puts an event listener onto the document for any keydown/up.
Global var keyboardKeys is an object.
The array like access allows creation of variable location if it doens't exist.
So basically, if null, then the key hasn't been touched.
Otherwise it will contain down or up.
Key value is checked through the key.

https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key

*/
function keyboardBinder() {
	document.addEventListener('keydown', handleKeyDown);
	document.addEventListener('keyup', handleKeyUp);
}
function handleKeyDown(event) { keyboardKeys[event.key] = 'down'; }
function handleKeyUp(event) { keyboardKeys[event.key] = 'up'; }
function mouseBinder() {
	document.addEventListener( 'mousemove', handleMouseMove );
}
function handleMouseMove(event) { mouseKeys.x = event.clientX; mouseKeys.y = event.clientY; }

function stupidCookies() {
	var arrCook = document.cookie.split(';');
	var temp;

	for(var i = 0; i < arrCook.length; i++) {
		temp = arrCook[i].trim().split('=');
		console.log( 'cookie name[' + temp[0] +']' + 'cookie value[' + temp[1] +']' );

		if( temp[0].indexOf('name1') > -1 ) { leaderBoard[0].name = temp[1]; if(temp[0].length < 3) {leaderBoard[0].name = 'AAA';} console.log('n1'); }
		if( temp[0].indexOf('name2') > -1 ) { leaderBoard[1].name = temp[1]; if(temp[0].length < 3) {leaderBoard[1].name = 'AAA';} console.log('n2');}
		if( temp[0].indexOf('name3') > -1 ) { leaderBoard[2].name = temp[1]; if(temp[0].length < 3) {leaderBoard[2].name = 'AAA';} console.log('n3');}
		if( temp[0].indexOf('score1') > -1 ) { leaderBoard[0].score = temp[1];  console.log('s1');}
		if( temp[0].indexOf('score2') > -1 ) { leaderBoard[1].score = temp[1];  console.log('s2');}
		if( temp[0].indexOf('score3') > -1 ) { leaderBoard[2].score = temp[1];  console.log('s3');}
	}

}








