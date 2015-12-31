








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

//time variables
var stageTimeStart	= 0;
var stageTime		= 0;
var dTime 			= 0;

//visual structures
var allTestVisuals;
var allMenuVisuals;
var allGameVisuals;

//input related
var keyboardKeys 	= {};
var mouseKeys 		= {};


//-----------------------------------------------------------------------------------------------------------Constants
//all constants prefixed with c
var cMainUpdaterInterval 	= 10; //milliseconds.
var cCanvasWidth			= window.innerWidth * 0.9; //TODO fix me, this needs to be a different value for the sake of consistency
var cCanvasHeight 			= window.innerHeight * 0.9;
var cPiOver180 				= Math.PI / 180;
var c180OverPi 				= 180 / Math.PI;

//gameState tracking
var gameState 		= "none";
var	gsTest	 		= "test";
var	gsMenu	 		= "menu";
var gsGame 			= "game";


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

