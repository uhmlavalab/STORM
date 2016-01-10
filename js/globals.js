








//-----------------------------------------------------------------------------------------------------------Globals

//visuals
var stage;

//entity trackers
var allEntities 	= [];
var allInvaders 	= [];
var allShots 		= [];
var allPlayers 		= [];
var allExplosions 	= [];
var allEntitiesToUpdate = []; //an experiment with self accounting entities.

//state vars
var testVars 		= {}; //TODO states should be their own objects (OO-structures).
var menuVars 		= {};
var gameVars 		= {};
	gameVars.goSpeed = 1;
var resultVars 		= {};
	resultVars.blinkCounter;
	resultVars.blinkDuration;


//time variables
var stageTimeStart	= 0;
var stageTime		= 0;
var dTime 			= 0;

//visual structures
var allTestVisuals;
var allMenuVisuals;
var allGameVisuals;
var allResultVisuals;
var bgLayer;
var backLayer;
var midLayer;
var frontLayer;

//input related
var keyboardKeys 	= {};
var mouseKeys 		= {};

//highScore object
var highScores 		= { };
	highScores.name1;
	highScores.name2;
	highScores.name3;
	highScores.score1;
	highScores.score2;
	highScores.score3;

//-----------------------------------------------------------------------------------------------------------Constants
//all constants prefixed with c
var cMainUpdaterInterval 	= 10; //milliseconds.
var cCanvasWidth			= 1535;//1535; //TODO fix me, this needs to be a different value for the sake of consistency
var cCanvasHeight 			= 860; //860;
var cPiOver180 				= Math.PI / 180;
var c180OverPi 				= 180 / Math.PI;
var cEn1Width				= 32;
var cBgStarMoveSpeed 		= 0.5;

//gameState tracking
var gameState 		= "none";
var	gsTest	 		= "test";
var	gsMenu	 		= "menu";
var gsGame 			= "game";
var gsResult		= "result";


//controls
var playerControls = [
	//p1
	{
		"up":"w",
		"down":"s",
		"left":"a",
		"right":"d",
		"shoot":"e",

		"gc_up":"w",
		"gc_down":"s",
		"gc_left":"a",
		"gc_right":"d",
		"gc_shoot":"e"
	},
	//p2
	{
		"up":"i",
		"down":"k",
		"left":"j",
		"right":"l",
		"shoot":"u",

		"gc_up":"i",
		"gc_down":"k",
		"gc_left":"j",
		"gc_right":"l",
		"gc_shoot":"u"
	},
	//p3
	{
		"up":"5",
		"down":"t",
		"left":"r",
		"right":"y",
		"shoot":"6",

		"gc_up":"5",
		"gc_down":"t",
		"gc_left":"r",
		"gc_right":"y",
		"gc_shoot":"6"
	},
	//p4
	{
		"up":"h",
		"down":"n",
		"left":"b",
		"right":"m",
		"shoot":"g",

		"gc_up":"h",
		"gc_down":"n",
		"gc_left":"b",
		"gc_right":"m",
		"gc_shoot":"g"
	}
];



//-----------------------------------------------------------------------------------------------------------Debug
var debug 		= {};
	debug.general 	= true;
	debug.menu 		= true;
	debug.ui 		= true;
	debug.entity 	= true;
	debug.enemy 	= true;
	debug.player 	= true;
	debug.command 	= true;



//-----------------------------------------------------------------------------------------------------------Utility functions

/**
This will print only if the appropriate debug is enabled.
*/
function debugPrint(stringToPrint, condition) {
	var willPrint = false;
	if(condition === null && debug.general) { willPrint = true; }
	else if ( debug[ "" + condition] ) { stringToPrint = "Debug:" + condition + ">" + stringToPrint; willPrint = true; }

	if(willPrint) { consolePrint(stringToPrint); }
}


/**
May put additional constraints on this later.
TODO think of a better way to mark exit param.
*/
function consolePrint(stringToPrint, exit) {
	console.log(stringToPrint);
	if( exit === "exit" ) { throw new Error("Something went badly wrong!"); }
}

/**
Check keyboardKeys if a key is down.
*/
function isKeyboardKeyDown( objectAttribute ) {
	if ( keyboardKeys[objectAttribute] === 'down') { return true; }
	return false;
}

/**
Check keyboardKeys if a key is up.
*/
function isKeyboardKeyUp( objectAttribute ) {
	if ( keyboardKeys[objectAttribute] === 'up') { return true; }
	return false;
}


/**
Must be derived from the createEntity class to get the correct getEncompassingRectangle function.
*/
function areEntitiesTouching( e1, e2 ) {
	return areRectanglesTouching( e1.getEncompassingRectangle(), e2.getEncompassingRectangle() );
}

/**
Assumes both params are rects. They have
x - center value
y - center value
width
height
Returns true if rectangles are touching.
*/
function areRectanglesTouching( r1, r2 ) {
	if(
		(r1.x < r2.x + r2.width)
		&& (r1.x + r1.width > r2.x)
		&& (r1.y < r2.y + r2.height)
		&& (r1.y + r1.height > r2.y )
		) {
		return true;
	}
	return false;
} //end areRectanglesTouching

