








//-----------------------------------------------------------------------------------------------------------Globals

//visuals
var stage;

//entity trackers
var allEntities 	= [];
var allInvaders 	= [];
var allShots 		= [];
var allPlayers 		= [];

//gameState tracking
var gameState 		= "none";
var	gsTest	 		= "test";

//time variables
var stageTimeStart	= 0;
var stageTime		= 0;
var dTime 			= 0;

//visual structures
var allTestVisuals;

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





