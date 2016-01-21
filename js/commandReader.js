

var commandProcessing = {};
	commandProcessing.currentInvader;
	commandProcessing.commandList = [];

	
//-----------------------------------------------------------------------------------------------------------
/**
Loads the individual entries into the commandList
*/
commandProcessing.loadList = function(arrayOfStringsToLoad) {
	debugPrint( "", "command" );
	debugPrint( "", "command" );
	debugPrint( "Loading Commands:", "command" );
	//remove all current commands
	while(commandProcessing.commandList.length > 0) { commandProcessing.commandList.pop(); }
	
	//load all the commands
	for(var i = 0; i < arrayOfStringsToLoad.length; i++) {
		commandProcessing.commandList.push( arrayOfStringsToLoad[i] );
		debugPrint( arrayOfStringsToLoad[i], "command" );
	}

	debugPrint( "", "command" );
	debugPrint( "", "command" );
} //end
	
//-----------------------------------------------------------------------------------------------------------
/**
Called in the logic loop.

Based on the stageTime.
*/
commandProcessing.handleTimingOfCommands = function() {
	var partsOfCommand;
	var lookAheadLimit = 60; //spawns
	var laCount = 0;
	//for each command
	for(var i = 0; i < commandProcessing.commandList.length; i++) {
		//get the parts
		partsOfCommand = commandProcessing.commandList[i].split("|");
		/*
		Currently handles
		- discarding of lines without pipes | usually comments or descriptions.
		- spawn when listed time has passed
		- haltUntil, moveToBy,dieAt
		*/

		//if there are less than two pieces no | in the line, it must / probably is a comment.
		if(partsOfCommand.length < 2) {
			debugPrint( "Discarding command:" + commandProcessing.commandList[i], "command");
			commandProcessing.commandList.splice(i,1);
			i--;
		}
		//see if it is a spawn command
		else if( (partsOfCommand[1].indexOf('spawn') >= 0) && ( parseInt( partsOfCommand[0] ) < stageTime) ) {
			debugPrint( "Attempting to handle command:" + commandProcessing.commandList[i], "command");
			commandProcessing.cmdProcessLine( partsOfCommand );

			//remove the last command and reduce index because the removed command.
			commandProcessing.commandList.splice(i,1);
			i--;
		}
		else if ( partsOfCommand[1].indexOf('spawn') >= 0 ) {
			laCount++;
			//if hit look ahead limit stop
			if(laCount >= lookAheadLimit) {
				return;
			}
			//else skip to next spawn.
			else {
				i++;
				while ( commandProcessing.commandList[i].indexOf('spawn') === -1 ) {
					i++;
					if( i >= commandProcessing.commandList.length ) {
						return;
					}
				} //end while looking for next spawn command
				i--;
			}
		}
		else if (
			(partsOfCommand[1].indexOf('haltUntil') >= 0  ) 
			|| (partsOfCommand[1].indexOf('moveToBy') >= 0  ) 
			|| (partsOfCommand[1].indexOf('dieAt') >= 0  ) 
			|| (partsOfCommand[1].indexOf('shootAtTime') >= 0  ) 
			|| (partsOfCommand[1].indexOf('shootInterval') >= 0  ) 
			){
			commandProcessing.cmdProcessLine( partsOfCommand );

			//remove the last command and reduce index because the removed command.
			commandProcessing.commandList.splice(i,1);
			i--;
		}
		else {
			return; // meaning only the above handled commands will work
		}

	} //end for each command

} //end handleTimingOfCommands


//-----------------------------------------------------------------------------------------------------------cmdProcessLine
/**
Assumes that the function will be given a line and process it.
ONLY 1 command line.
*/

commandProcessing.cmdProcessLine = function ( partsOfCommand ) {

	//trim the whitespace
	for(var i = 0; i < partsOfCommand.length; i++) { partsOfCommand[i] = partsOfCommand[i].trim(); }

	//check index 1 because index 0 always has the time
	switch(partsOfCommand[1]) {
		// 0			1			2					3					4
		// time 	| spawn 	| xLocationToSpawn 	| yLocationToSpawn 	| attribute string separated by commas.
		case "spawn":
			commandProcessing.currentInvader = invaderFindFirstDead();
			commandProcessing.currentInvader.spawnAt( parseInt(partsOfCommand[2]), parseInt(partsOfCommand[3]), partsOfCommand[4] );
			break;
		//	0			1
		// time 	| haltUntil
		case "haltUntil":
			var cmd = {};
			cmd.time = parseInt(partsOfCommand[0]);
			cmd.type = partsOfCommand[1];
			commandProcessing.currentInvader.addMoveCommand( cmd );
			break;
		//	0			1			2		3
		// time 	| moveToBy 	| x 	| y
		case "moveToBy":
			var cmd = {};
			cmd.time 	= parseInt(partsOfCommand[0]);
			cmd.type 	= partsOfCommand[1];
			cmd.x 		= parseInt(partsOfCommand[2]);
			cmd.y 		= parseInt(partsOfCommand[3]);
			commandProcessing.currentInvader.addMoveCommand( cmd );
			break;
		//	0			1
		// time 	| dieAt
		case "dieAt":
			var cmd = {};
			cmd.time = parseInt(partsOfCommand[0]);
			cmd.type = partsOfCommand[1];
			commandProcessing.currentInvader.addMoveCommand( cmd );
			break;
		//	0			1		2		3
		// time 	| shootAt | type | percent
		case "shootAtTime":
			var cmd = {};
			cmd.time 	= parseInt(partsOfCommand[0]);
			cmd.command = partsOfCommand[1];
			cmd.type 	= partsOfCommand[2];
			cmd.percent = partsOfCommand[3];
			commandProcessing.currentInvader.addShootAtTimeCommand( cmd );
			break;
		//	0			1			2 		3		4
		// time 	| shootAt  | 	type |	percent
		//											need to add counter
		case "shootInterval":
			var cmd = {};
			cmd.time 	= parseInt(partsOfCommand[0]);
			cmd.command = partsOfCommand[1];
			cmd.type 	= partsOfCommand[2];
			cmd.percent = partsOfCommand[3];
			cmd.counter = 0;
			commandProcessing.currentInvader.addShootIntervalCommand( cmd );
			break;

		default:
			consolePrint("Error, invalid command being processed:" + cmdString);
			break;
	}
} //end cmdProcessLine








//-----------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------
/*
	commandProcessing.allCommandFiles = {};
		commandProcessing.allCommandFiles.test = "commandLL01";
		commandProcessing.allCommandFiles.L01 = "commandLL01";
	commandProcessing.fileName = "commandLL01.txt";
	commandProcessing.requestedFileForLevel = false;
	commandProcessing.readToReadFile;
	commandProcessing.loadedFileForLevel = false;
	commandProcessing.cyclesNeedForRetrieval;
	commandProcessing.fileContents;


commandProcessing.retrieveFileFromServer = function (file){
	commandProcessing.readToReadFile = false;
	var rawFile = new XMLHttpRequest();
	rawFile.open("GET", file, false);
	rawFile.onreadystatechange = function ()
	{
		if(this.readyState === 4)
		{
			if(this.status === 200 || this.status == 0)
			{
				commandProcessing.fileContents = this.responseText;
				commandProcessing.readToReadFile = true;
			}
		}
	}
	rawFile.send(null);
}

commandProcessing.prepStageFileLoad = function ( stageToLoad ) {
	commandProcessing.requestedFileForLevel = false;
	commandProcessing.loadedFileForLevel = false;
	commandProcessing.cyclesNeedForRetrieval = 0;

	commandProcessing.fileName = commandProcessing.allCommandFiles[stageToLoad];
}

commandProcessing.isCommandsForLevelProcessed = function () {
	debugPrint("Checking if command files processed","command");
	if( !commandProcessing.requestedFileForLevel ) {
		commandProcessing.retrieveFileFromServer( commandProcessing.filename );
		commandProcessing.requestedFileForLevel = true;
	}
	else if( !commandProcessing.readToReadFile ) {
		commandProcessing.cyclesNeedForRetrieval++;
		debugPrint( "waiting for file retrieval cycle:" + commandProcessing.cyclesNeedForRetrieval, "command" );
	}
	else {
		debugPrint("Ready to process commands, took " + commandProcessing.cyclesNeedForRetrieval + " cycles to retrieve.", "command");
		debugPrint(commandProcessing.fileContents, "command");
		debugPrint("TODO actually process commands", "command");
		//TODO actually process commands

		return true;
	}
	return false;
}

*/
































