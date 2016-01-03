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
		ent.defaultShotLimit = 2;
		ent.absoluteShotLimit = 10;
		ent.activeShots		= 0; //TODO maybe find a better way for this to work.
		ent.shotSpeed 		= 400;
		ent.shotSpeedDefault = 400;
		ent.shotSize 		= 16;
		ent.shotSizeDefault = 16;
		ent.moveDirection 	= 'none';
		ent.tryShoot 		= false;

		ent.respawnTime 	= 3000;
		ent.respawnCounter 	= 0;
		ent.readyToRespawn	= false;



		playerCreateVisual(ent); //TODO double check this.

	/**
	Overrides entity update.
	*/
	ent.update = function() {
		if(this.isAlive) { //TODO don't forget to take into account alive status.
			this.moveUpdate();
			this.shootUpdate();

			this.vScoreOutline.y( this.vNameOutLine.getTextHeight() + this.vName.y());
			this.vScore.y( this.vScoreOutline.y() + 1 );
			this.vScoreOutline.text("Score:" + this.score);
			this.vScore.text("Score:" + this.score);
			this.vScoreOutline.x( -1 * this.vScoreOutline.getTextWidth()/2 -1 );
			this.vScore.x( this.vScoreOutline.x() + 1 );
		}
		else if(!this.readyToRespawn) {
			this.respawnCounter += dTime;
			if(this.respawnCounter >= this.respawnTime) {
				this.respawnCounter = this.respawnTime;
				this.vScoreOutline.text( "P" + allPlayers.indexOf(this) + " shoot to respawn." );
				this.vScore.text(this.vScoreOutline.text());
				this.readyToRespawn = true;
			}
			else {
				this.vScoreOutline.text( "P"
					+ allPlayers.indexOf(this) + " respawn in " 
					+ (parseInt((this.respawnTime - this.respawnCounter)/100)/10 ) + "s" );
				this.vScore.text(this.vScoreOutline.text());
			}
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
		var exp = explosionFindFirstDead();
		if(exp !== null) {
			exp.spawnAt( this.x, this.y );
		}

		this.vScore.x( this.x + 100 );
		this.vScoreOutline.x( this.vScore.x() -1 );
		this.vScore.y( this.y + 100 );
		this.vScoreOutline.y( this.vScore.y() -1 );

		this.isAlive = false;//set isAlive to false
		//remove sprite code here
		this.x = -100;
		this.y = -100;

		this.respawnCounter 	= 0;
		this.readyToRespawn	= false;

		// maybe can't remove player from updater even if dead.
		//this.removeFromUpdater();

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
		this.shotSpeed = this.shotSpeedDefault;
		this.shotSize = this.shotSizeDefault;
		this.shotLimit = this.defaultShotLimit;

		this.respawnCounter 	= 0;
		this.readyToRespawn	= false;
    };//takes parameters of where you want to spawn entity 

    /**
	Allows respawn from last position.
	Changes score.
    */
    ent.respawn = function () {
    	var rx = this.vScore.x() - 100;
    	var ry = this.vScore.y() - 100;
    	this.spawnAt( rx, ry );

    	score -= 10;
    	if(score < 0) { score = 0; }

    };

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
    	shotToUse.spawnAt( this.x, this.y, 	this.x + 1000, this.y, 	this.shotSpeed, 		allPlayers.indexOf(this), this.shotSize);
    	this.activeShots++;
    	debugPrint("Player" + allPlayers.indexOf(this) + " activating shot", "player");

    } //end shootUpdate



	allPlayers.push( ent );
	return ent; //DONT FORGET THIS
} //end create player




// Create player sprite and add it to group
function playerCreateVisual(ref){
	ref.vGroup = new Konva.Group();

	ref.vImage = new Konva.Image({
		x: allSpriteObjects['ac3'].width/2,
		y: -1 * allSpriteObjects['ac3'].height/2,
		image: allSpriteObjects['ac3'],
		width: allSpriteObjects['ac3'].width,
		height: allSpriteObjects['ac3'].height
	});
	ref.vImage.rotate(90); //rotating 90 means the x has to be further out.
	ref.vGroup.add(ref.vImage);

	ref.width = allSpriteObjects['ac3'].width;
	ref.height = allSpriteObjects['ac3'].height;


	ref.vNameOutLine = new Konva.Text({
		x: 0,
		y: 0,
		text: "P"+(allPlayers.length + 1), //this is possible because player hasn't yet been added to allPlayer array yet
		fontSize: 20,
		fontFamily: 'Courier',
		fill: 'black'
	}); 
	ref.vNameOutLine.x( -1 * ref.vNameOutLine.getTextWidth()/2 -1 );
	ref.vNameOutLine.y( ref.height/2 + 4 );

	ref.vName = new Konva.Text({
		x: ref.vNameOutLine.x() + 1,
		y: ref.vNameOutLine.y() + 1,
		text: ref.vNameOutLine.text(),
		fontSize: 20,
		fontFamily: 'Courier',
		fill: 'green'
	}); 

	ref.vScoreOutline = new Konva.Text({
		x: -100,
		y: ref.vName.getTextHeight() + ref.vName.y(),
		text: "Score: 0",
		fontSize: 20,
		fontFamily: 'Courier',
		fill: 'black'
	});
	ref.vScore = new Konva.Text({
		x: -100,
		y: ref.vScoreOutline.y() + 1,
		text: "Score: 0",
		fontSize: 20,
		fontFamily: 'Courier',
		fill: 'green'
	});
	ref.vGroup.add( ref.vNameOutLine );
	ref.vGroup.add( ref.vName );
	ref.vGroup.add( ref.vScoreOutline );
	ref.vGroup.add( ref.vScore );


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


























