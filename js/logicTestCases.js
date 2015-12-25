

var tmEnemyImageSwitching = "tmEnemyImageSwitching";
var tmCommandSpawnTest = "tmCommandSpawnTest";
var tmCommandMove = "tmCommandMove";
var tmShotCreation = "tmShotCreation";
var testMode = tmShotCreation;

var ltc = {};

/**
Handles all preparation needed for testing.
*/
function prepandSwitchToTest() {
	gameState = gsTest;
	stageTimeStart = Date.now();


	switch (testMode) {
		case tmEnemyImageSwitching:
			prepTestImageSwitching();
			break;
		case tmCommandSpawnTest:
			prepTestCommandSpawn();
			break;
		case tmCommandMove:
			prepTestCommandMove();
			break;
		case tmShotCreation:
			prepTestShotCreation();
			break;
		default:
			consolePrint("Error with test mode.", "exit");
	}

	//commandProcessing.prepStageFileLoad("test");

	placeScreenVisuals(allTestVisuals);

} //end prepandSwitchToTest


//-----------------------------------------------------------------------------------------------------------

/**
Handles input for testing.
*/
function inputTest() {

	switch (testMode) {
		case tmEnemyImageSwitching:
			inputTestImageSwitching();
			break;
		case tmCommandSpawnTest:
			inputTestCommandSpawn();
			break;
		case tmCommandMove:
			inputTestCommandMove();
			break;
		case tmShotCreation:
			inputTestShotCreation();
			break;
		default:
			consolePrint("Error with test mode.", "exit");
	}
}
/**
Handles logic for Testing.
*/
function logicTest() {

	switch (testMode) {
		case tmEnemyImageSwitching:
			logicTestImageSwitching();
			break;
		case tmCommandSpawnTest:
			logicTestCommandSpawn();
			break;
		case tmCommandMove:
			logicTestCommandMove();
			break;
		case tmShotCreation:
			logicTestShotCreation();
			break;
		default:
			consolePrint("Error with test mode.", "exit");
	}
}


//----------------------------------------------------------------------------------------------------------- prep

function prepTestImageSwitching() {
	allTestVisuals = {};
	allTestVisuals.backLayer = {};
	allTestVisuals.midLayer = {};
	allTestVisuals.frontLayer = {};

	var atvm = allTestVisuals.midLayer;

	for(var i = 0; i < 5; i++) {
		createInvader();
		atvm["invader"+i] = allInvaders[i].vGroup;
		allInvaders[i].spawnAt( window.innerWidth/6 * (i + 1), window.innerHeight/2, "visual:en1,hp:1");
	}
}

function inputTestImageSwitching() {
	if( keyboardKeys["q"] === "down" ) {
		allInvaders[0].spawnAt( allInvaders[0].x, allInvaders[0].y, "visual:en1,hp:1"  );
	}
	if( keyboardKeys["a"] === "down" ) {
		allInvaders[0].spawnAt( allInvaders[0].x, allInvaders[0].y, "visual:en2,hp:1"  );
	}
	if( keyboardKeys["z"] === "down" ) {
		allInvaders[0].spawnAt( allInvaders[0].x, allInvaders[0].y, "visual:en3,hp:1"  );
	}

}

function logicTestImageSwitching() {
	for(var i = 0; i < allInvaders.length; i++) {
		allInvaders[i].update();
	}
}

//-----------------------------------------------------------------------------------------------------------

function prepTestCommandSpawn() {
	allTestVisuals = {};
	allTestVisuals.backLayer = {};
	allTestVisuals.midLayer = {};
	allTestVisuals.frontLayer = {};

	var atvm = allTestVisuals.midLayer;

	for(var i = 0; i < 10; i++) {
		createInvader();
		atvm["invader"+i] = allInvaders[i].vGroup;
		allInvaders[i].death();
	}

	//load the level commands file
	commandProcessing.loadList( cmdListTestSpawn );
}


function inputTestCommandSpawn() {

}

function logicTestCommandSpawn() {


	commandProcessing.handleTimingOfCommands();


	for(var i = 0; i < allInvaders.length; i++) {
		allInvaders[i].update();
	}
}


//-----------------------------------------------------------------------------------------------------------

function prepTestCommandMove() {
	allTestVisuals = {};
	allTestVisuals.backLayer = {};
	allTestVisuals.midLayer = {};
	allTestVisuals.frontLayer = {};

	var atvm = allTestVisuals.midLayer;

	for(var i = 0; i < 10; i++) {
		createInvader();
		atvm["invader"+i] = allInvaders[i].vGroup;
		allInvaders[i].death();
	}

	//load the level commands file
	commandProcessing.loadList( cmdListTestMove );
}


function inputTestCommandMove() {

}

function logicTestCommandMove() {


	commandProcessing.handleTimingOfCommands();


	for(var i = 0; i < allInvaders.length; i++) {
		allInvaders[i].update();
	}
}



//-----------------------------------------------------------------------------------------------------------

function prepTestShotCreation() {
	allTestVisuals = {};
	allTestVisuals.backLayer = {};
	allTestVisuals.midLayer = {};
	allTestVisuals.frontLayer = {};

	var atvm = allTestVisuals.midLayer;

	for(var i = 0; i < 50; i++) {
		createShot();
		atvm["shot"+i] = allShots[i].vGroup;
		allShots[i].death();
	}

	//allShots[0].spawnAt( 0,0,     0,0,    0, 10 );

	createInvader();
	atvm["inv0"] = allInvaders[0].vGroup;
	allInvaders[0].spawnAt( 250,250,   "visual:en3,hp:1");
	// allInvaders[0].addShootAtTimeCommand({"time": 1000 , "command": "shootAtTime" , "type": "amountOfShots:1,speed:50,target:player, size:10" });
	// allInvaders[0].addShootAtTimeCommand({"time": 2000 , "command": "shootAtTime" , "type": "amountOfShots:2,speed:50,target:player, size:20" });
	// allInvaders[0].addShootAtTimeCommand({"time": 3000 , "command": "shootAtTime" , "type": "amountOfShots:3,speed:50,target:player, size:30" });
	// allInvaders[0].addShootAtTimeCommand({"time": 4000 , "command": "shootAtTime" , "type": "amountOfShots:4,speed:50,target:player, size:40" });
	// allInvaders[0].addShootAtTimeCommand({"time": 5000 , "command": "shootAtTime" , "type": "amountOfShots:5,speed:50,target:player, size:50" });
	// allInvaders[0].addShootAtTimeCommand({"time": 6000 , "command": "shootAtTime" , "type": "amountOfShots:6,speed:50,target:player, size:60" });
	// allInvaders[0].addShootAtTimeCommand({"time": 7000 , "command": "shootAtTime" , "type": "amountOfShots:7,speed:50,target:player, size:70" });
	// allInvaders[0].addShootAtTimeCommand({"time": 8000 , "command": "shootAtTime" , "type": "amountOfShots:8,speed:50,target:player" });
	allInvaders[0].addShootIntervalCommand({"time": 1000, "command": "shootInterval", "type": "amountOfShots:2,speed:50,target:circleBurst" });

	//load the level commands file
	//commandProcessing.loadList( cmdListTestMove );
}


function inputTestShotCreation() {
	var firstDeadShot = shotFindFirstDead();

	if(firstDeadShot === null) { return; }

	if( keyboardKeys['q'] === 'down' ) {
		keyboardKeys['q'] = 'none';
		firstDeadShot.spawnAt( 250, 250, 0, 0,   100, 10 );
	}
	else if( keyboardKeys['w'] === 'down' ) {
		keyboardKeys['w'] = 'none';
		firstDeadShot.spawnAt( 250,250,   250,0,     100,   10 );
	}
	else if( keyboardKeys['e'] === 'down' ) {
		keyboardKeys['e'] = 'none';
		firstDeadShot.spawnAt( 250,250,    500,0,     100,   10 );
	}
	else if( keyboardKeys['a'] === 'down' ) {
		keyboardKeys['a'] = 'none';
		firstDeadShot.spawnAt( 250,250,    0,250,     100,   10 );
	}
	else if( keyboardKeys['d'] === 'down' ) {
		keyboardKeys['d'] = 'none';
		firstDeadShot.spawnAt( 250,250,    500,250,     100,   10 );
	}
	else if( keyboardKeys['z'] === 'down' ) {
		keyboardKeys['z'] = 'none';
		firstDeadShot.spawnAt( 250,250,    0,500,     100,   10 );
	}
	else if( keyboardKeys['x'] === 'down' ) {
		keyboardKeys['x'] = 'none';
		firstDeadShot.spawnAt( 250,250,    250,500,     100,   10 );
	}
	else if( keyboardKeys['c'] === 'down' ) {
		keyboardKeys['c'] = 'none';
		firstDeadShot.spawnAt( 250,250,    500,500,     100,   10 );
	}

}

function logicTestShotCreation() {


	for(var i = 0; i < allShots.length; i++) {
		allShots[i].update();
		if(allShots[i].x < 0 || allShots[i].x > window.innerWidth || allShots[i].y < 0 || allShots[i].y > window.innerHeight) {
			allShots[i].death();
		}
	}

	allInvaders[0].update();
}







