

/*
This should be the first function to activate.

*/
function main() {
	console.log("Starting");

	keyboardBinder(); //backup for testing without gc. see bottom of file for description on usage.
	mouseBinder();

	setupKonvaCanvas();
	setupSpriteImageObjects();

	stupidCookies();

	setupMenuVisuals();
	setupGameVisuals();
	setupResultVisuals();




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
		case gsResult:
			inputResult();
			logicResult();
			break;
		default:
			consolePrint('Error: unknown game state:' + gameState, "exit");
			break;
	}
	//update time;
	dTime = Date.now() - stageTimeStart - stageTime;
	if(dTime < 0) { dTime = 0; }
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
	var allCookies = document.cookie;
	consolePrint("Cookie contents:" + allCookies +".");
	allCookies = allCookies.split(";")

	if(
		getCookieStringGivenKey("name1") === null
		|| getCookieStringGivenKey("name2") === null
		|| getCookieStringGivenKey("name3") === null
		|| getCookieStringGivenKey("score1") === null
		|| getCookieStringGivenKey("score2") === null
		|| getCookieStringGivenKey("score3") === null
		) {
		highScores.name1 = "AAA";
		document.cookie = "name1=AAA";
		highScores.name2 = "AAA";
		document.cookie = "name2=AAA";
		highScores.name3 = "AAA";
		document.cookie = "name3=AAA";
		
		highScores.score1 = 0;
		document.cookie = "score1=0";
		highScores.score2 = 0;
		document.cookie = "score2=0";
		highScores.score3 = 0;
		document.cookie = "score3=0";
		allCookies = document.cookie;
		consolePrint("Seeding with initial AAA contents:" + allCookies +".");
		allCookies = allCookies.split(";")
	}
	else {
		highScores.name1 = getCookieStringGivenKey("name1");
		highScores.name2 = getCookieStringGivenKey("name2");
		highScores.name3 = getCookieStringGivenKey("name3");
		highScores.score1 = parseInt( getCookieStringGivenKey("score1") );
		highScores.score2 = parseInt( getCookieStringGivenKey("score2") );
		highScores.score3 = parseInt( getCookieStringGivenKey("score3") );
	}
}

function getCookieStringGivenKey( keyString ) {
	var allCookies = document.cookie;
	if( allCookies.indexOf(keyString) !== -1 ) {
		allCookies = allCookies.substring( allCookies.indexOf(keyString) );
		allCookies = allCookies.substring( allCookies.indexOf('=') + 1 );

		if(allCookies.indexOf(';') !== -1) {
			allCookies = allCookies.substring( 0, allCookies.indexOf(';') );
		}
		return allCookies;
	}
	return null;
}








