/*
createPlayer.js



*/


/*
creates a player.

*/
function createPlayer() {
	var ent = createEntity();//first grab template
		ent.type 			= "player";//override type
		//more properties
		ent.justDied 		= false;
		ent.speed 			= 200; //per second in pixels
		ent.score 			= 0;
		ent.shotLimit 		= 2;
		ent.absoluteShotLimit = 10;
		ent.activeShots		= 0; //TODO maybe find a better way for this to work.
		ent.shotSpeed 		= 300;
		ent.shotSpeedDefault = 300;
		ent.shotSize 		= 16;
		ent.shotSizeDefault = 16;
		ent.moveDirection 	= 'none';
		ent.tryShoot 		= false;

		playerCreateVisual(ent); //TODO double check this.

	/**
	Overrides entity update.
	*/
	ent.update = function() {
		if(this.isAlive) { //TODO don't forget to take into account alive status.
			this.moveUpdate();
			this.shootUpdate();
		}
		//end of update always update the visual
		this.moveVisualsToCoordinates();
	};

	/**
	Overrides entity moveUpdate.

	Note: speed is per second in pixels.
	*/
	ent.moveUpdate = function () {
		var xmod = 0;
		var ymod = 0;
		var timeMod;

		//search the moveDirection string for keywords
		if( this.moveDirection.indexOf( "up" ) !== -1 ) { ymod = -1; }
		else if( this.moveDirection.indexOf( "down" ) !== -1 ) { ymod = 1; }
		if( this.moveDirection.indexOf( "right" ) !== -1 ) { xmod = 1; }
		else if( this.moveDirection.indexOf( "left" ) !== -1 ) { xmod = -1; }

		if(xmod !== 0 && ymod !== 0) {
			xmod *= 0.7; //multiplication retains the sign.
			ymod *= 0.7;
		}

		timeMod = this.speed * ( dTime/1000) ;
		this.x += xmod * timeMod;
		this.y += ymod * timeMod;

		if( this.x < 0 ) { this.x = 0; }
		else if( this.x > cCanvasWidth ) { this.x = cCanvasWidth; }
		if( this.y < 0 ) { this.y = 0; }
		else if( this.y > cCanvasHeight ) { this.y = cCanvasHeight; }

	}; //end moveUpdate
	
    /**
    Overrides the death function on entity.
    */
	ent.death = function () {
		this.removeFromUpdater();
		this.isAlive = false;//set isAlive to false
		//remove sprite code here
		this.x = -100;
		this.y = -100;

		this.shotSpeed = this.shotSpeedDefault;
		this.shotSize = this.shotSizeDefault;
		this.shotLimit = 1;


		this.moveVisualsToCoordinates();
	};
	
    /**
    Overrides.
    Immediatley moves to given location.
    Hp set to given value.
    Type determines attributes: visual, width, height.
    */
    ent.spawnAt = function (centerXvalue, centerYvalue) {
    	this.addToUpdater();
        this.hp = 1;
        this.isAlive = true;
        this.x = centerXvalue;
        this.y = centerYvalue;
    };//takes parameters of where you want to spawn entity 

    /**
	At least for the time being, players do not have collision effects on other things.
    */
    ent.collisionEffects = function() {

    };


    /**
    	Check for shoots that need to be performed at time.
    */
    ent.shootUpdate = function() {
    	if(this.tryShoot !== true) { return; }
    	this.tryShoot = false;

    	if(this.activeShots >= this.shotLimit) {
    		debugPrint( "Player reached mechanical limit  (" + this.shotLimit + ")", "player" );
    		return;
    	}

    	var shotToUse = shotFindFirstDead();
    	if( shotToUse === null ) { debugPrint( "Player unable to shoot due game reaching shot limit (" + allShots.length + ")", "player" ); return; }
    	//parameters 		xspawn 	yspawn 	xdest 	ydest			
    	shotToUse.spawnAt( this.x, this.y, 	this.x, this.y - 1000, 	this.shotSpeed, 		allPlayers.indexOf(this), this.shotSize);
    	this.activeShots++;


    } //end shootUpdate



	allPlayers.push( ent );
	return ent; //DONT FORGET THIS
} //end create player




// Create player sprite and add it to group
function playerCreateVisual(ref){
	ref.vGroup = new Konva.Group();

	ref.vImage = new Konva.Image({
		x: -1 * allSpriteObjects['ac3'].width/2,
		y: -1 * allSpriteObjects['ac3'].height/2,
		image: allSpriteObjects['ac3'],
		width: allSpriteObjects['ac3'].width,
		height: allSpriteObjects['ac3'].height
	});
	ref.vGroup.add(ref.vImage);

	ref.width = allSpriteObjects['ac3'].width;
	ref.height = allSpriteObjects['ac3'].height;

} //end playerCreateVisual



function playerFindFirstDeadIndex() {
	for(var i = 0; i < allPlayers.length; i++) {
		if(!allPlayers[i].isAlive) {
			return i;
		}
	}
	return -1;
}


function playerFindFirstDead() {
	var i = playerFindFirstDeadIndex();
	if ( i === -1 ) { return null; }
	return allPlayers[ i ];
} //end playerFindFirstDead


























