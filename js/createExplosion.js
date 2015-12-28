/**

createExplosion.js


*/


/*
creates an explosion effect.

*/
function createExplosion() {
	var ent = createEntity();//first grab template
		ent.type 			= "explosion";//override type
		//more properties
		ent.imageType		= 0; // 1 vs 2
		ent.imageFrames 	= [];
		ent.currentFrame 	= 0;
		ent.frameDuration 	= 200; //milliseconds
		ent.frameTimeCounter = 0;

		explosionCreateVisual(ent); //TODO double check this.

	/**
	Overrides entity update.
	*/
	ent.update = function() {

		//TODO don't forget to take into account alive status.

		if(this.isAlive) {
			this.moveUpdate();
			this.shootUpdate();
		}
		//end of update always update the visual
		this.moveVisualsToCoordinates();
	};

	/**
	Overrides entity moveUpdate.
	Movement will be based upon given orders.
	*/
	ent.moveUpdate = function () {
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
	};
	
    /**
    Overrides.
    Immediatley moves to given location.
    Hp set to given value.
    Type determines attributes: visual, width, height.
    */
    ent.spawnAt = function (centerXvalue, centerYvalue, type) {
    	this.addToUpdater();
        this.hp = 1;
        this.isAlive = true;
        this.x = centerXvalue;
        this.y = centerYvalue;
        this.mcTimeStart = -1;

        while(this.moveCommands.length > 0) { this.moveCommands.pop(); }
        while(this.shootAtTimeCommands.length > 0) { this.shootAtTimeCommands.pop(); }
        while(this.shootIntervalCommands.length > 0) { this.shootIntervalCommands.pop(); }

        explosionSetTypeAttributes(this, type);
    };//takes parameters of where you want to spawn entity 

    /**
    At the moment no collision effects for explosions.
    */
    ent.collisionEffects = function() {

    };

	
	allExplosions.push( ent );
	return ent; //DONT FORGET THIS
} //end create explosion





// Create explosion sprite and add it to group
function explosionCreateVisual(ref){
	ref.vGroup = new Konva.Group();

	var explosionImage = "explode1";
	ref.imageType = 1;
	if(allExplosions.indexOf(ref) % 2 === 0) { explosionImage = "explode2"; ref.imageType = 2; }

	var xf = 0;
	var yf = 0;
	var width = 64;
	var height = 64;
	if(ref.imageType === 2 ) { width = 38; height = 38; }
	var obj;

	for(var i = 0; i < 14; i++ ) {
		obj = {};
		obj.x = xf;
		obj.y = yf;
		obj.width = width;
		obj.height = height;
		ref.imageFrames.push( obj );
		xf += width;
	}


	ref.vImage = new Konva.Image({
		x: -16,
		y: -16,
		image: allSpriteObjects[explosionImage],
		width: 32,
		height: 32
	});

	ref.vGroup.add(ref.vImage);


} //end explosionCreateVisual



function explosionFindFirstDeadIndex() {
	for(var i = 0; i < allExplosions.length; i++) {
		if(!allExplosions[i].isAlive) {
			return i;
		}
	}
	return -1;
}


function explosionFindFirstDead() {
	var i = explosionFindFirstDeadIndex();
	if ( i === -1 ) { return null; }
	return allExplosions[ i ];
} //end explosionFindFirstDead


























