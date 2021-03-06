/*
createShot.js



*/


/*
creates a shot.

*/
function createShot() {
	var ent = createEntity();//first grab template
		ent.type 			= "shot";//override type
		//more properties
		ent.justDied 		= false;
		ent.collisionDamage = 1;
		ent.speedPerSec		= 0;
		ent.xSpeedPerSec 	= 0; 
		ent.ySpeedPerSec 	= 0;
		ent.xDestination 	= 0;
		ent.yDestination 	= 0;
		ent.affliction 		= "none"; //TODO use to determine which elements this hits.

		shotCreateVisual(ent); //TODO double check this.

	/**
	Overrides entity update.
	*/
	ent.update = function() {

		//TODO don't forget to take into account alive status.
		if(this.isAlive) {
			this.moveUpdate();
		}

		//end of update always update the visual
		this.moveVisualsToCoordinates();
	};

	/**
	Overrides entity moveUpdate.
	Movement will be based upon given orders.
	*/
	ent.moveUpdate = function () {
		this.x += this.xSpeedPerSec * (dTime/1000);
		this.y += this.ySpeedPerSec * (dTime/1000);

		if( this.x < -50 || this.y < -50 || this.x > cCanvasWidth + 50 || this.y > cCanvasHeight + 50) {
			this.death();
		}
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
		this.moveVisualsToCoordinates();

		if( typeof this.affliction === "number" ) {
			allPlayers[ this.affliction ].activeShots--;
			this.affliction = "none";
		}
	};
	
    /**
    Overrides.

	TODO determine if size is necessary.

    */
    ent.spawnAt = function (centerXvalue, centerYvalue, xDestination, yDestination, speed, affliction, size) {
        this.addToUpdater();
        this.hp = 1;
        this.isAlive = true;
        this.x = centerXvalue;
        this.y = centerYvalue;
        this.xDestination 	= xDestination;
        this.yDestination 	= yDestination;
        this.speedPerSec 	= speed;
        this.affliction 	= affliction;
        if( typeof size === "number" ) {
        	this.width = size;
        	this.height = size;

        }
        else {
        	this.width = allSpriteObjects['shot'].width;
        	this.height = allSpriteObjects['shot'].height
        }
        this.vImage.width( this.width );
        this.vImage.height( this.height );
        this.vImage.x( this.width/-2 );
        this.vImage.y( this.width/-2 );

        // error
        // figure out the x/ySpeedPerSec based on center and destination
        shotDetermineSpeedForDestination(this);

    };//takes parameters of where you want to spawn entity 

    /**
	Shot collision mechanics depend on their affliction.
	basically if not a number then it probably belongs to enemies.

    */
    ent.collisionEffects = function( thingCollidedWith ) {
    	//immediately return if not alive. prevents more than one hit.
    	if ( !this.isAlive ) { return; }

    	//don't check against other shots or explosions.
    	//this is intended as a means to reduce computation requirements.
    	var tcwType = thingCollidedWith.type;
    	if(tcwType === "shot" || tcwType === "explosion" ) { return; }



    	var belongToPlayer = false;
    	if( typeof this.affliction === "number" ) { belongToPlayer = true; }

    	//if a player shot makes contact with an 
    	if( belongToPlayer && tcwType === "invader" && areEntitiesTouching(this, thingCollidedWith) ) {
    		thingCollidedWith.lastHitByPlayer = this.affliction; //set owner before damage, otherwise will be dead before refernce is set
    		thingCollidedWith.damage(1);
    		this.death();
    	}
    	else if ( !belongToPlayer && tcwType === "player" && areEntitiesTouching(this, thingCollidedWith) ) {
    		thingCollidedWith.damage(1);
    		this.death();
    	}
    }; //end collisionEffects

	
	allShots.push( ent );
	return ent; //DONT FORGET THIS
} //end create Invader

/**
Create invader sprite and add it to group
*/
function shotCreateVisual( ref ){
	ref.vGroup = new Konva.Group();

	ref.vImage = new Konva.Image({
		x: -1 * allSpriteObjects['shot'].width/2,
		y: -1 * allSpriteObjects['shot'].height/2,
		image: allSpriteObjects['shot'],
		width: allSpriteObjects['shot'].width,
		height: allSpriteObjects['shot'].height
	});

	// ref.vR1 = new Konva.Rect({
	// 	width: allSpriteObjects['shot'].width,
	// 	height: allSpriteObjects['shot'].height,
	// 	fill: 'none',
	// 	stroke: 'red',
	// 	strokeWidth: 1
	// });
	// ref.vGroup.add(ref.vR1);

	ref.vGroup.add(ref.vImage);

} //end shotCreateVisual

/**
Calculate the x and y speed per second given source and destination.
radians = degrees * (pi / 180)
degrees = radians * (180 / pi)
c180OverPi
*/
function shotDetermineSpeedForDestination( ref ) {
	var xdiff = ref.xDestination - ref.x;
	var ydiff = ref.yDestination - ref.y;
	var radians = Math.atan2(ydiff, xdiff);

	ref.xSpeedPerSec = Math.cos(radians) * ref.speedPerSec;
	ref.ySpeedPerSec = Math.sin(radians) * ref.speedPerSec;

} // shotDetermineSpeedForDestination





function shotFindFirstDeadIndex() {
	for(var i = 0; i < allShots.length; i++) {
		if(!allShots[i].isAlive) {
			return i;
		}
	}
	return -1;
}

function shotFindFirstDead() {
	var i = shotFindFirstDeadIndex();
	if ( i === -1 ) { return null; }
	return allShots[ i ];
} //end shotFindFirstDead



















