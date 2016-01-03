/*
createInvader.js



*/


/*
creates an invader.

*/
function createInvader() {
	var ent = createEntity();//first grab template
		ent.type 			= "invader";//override type
		//more properties
		ent.justDied 		= false;
		ent.invaderType 	= -1; //not initialized type yet
		ent.collisionDamage = 1;
		ent.moveCommands	= []; //array of command objects.
		ent.mcTimeStart 	= -1;
		ent.mcXStart 	= -1;
		ent.mcYStart 	= -1;
		ent.shootAtTimeCommands	= []; //array of command objects.
		ent.shootIntervalCommands	= []; //array of command objects.
		ent.lastHitByPlayer = -1;

		invaderCreateVisual(ent); //TODO double check this.

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
		//if there are commands and the first one should activate
		if(this.moveCommands.length > 0) {

			//if the time has passed, fully implement it and remove it.
			if(this.moveCommands[0].time <= stageTime) {

				if(this.moveCommands[0].type === "moveToBy") {
					debugPrint( "completed moveToBy command", "command" );
					this.x = this.moveCommands[0].x;
					this.y = this.moveCommands[0].y;
				}
				else if (this.moveCommands[0].type === "dieAt") { this.death(); }

				this.mcTimeStart = -1;
				this.moveCommands.splice(0,1);
			}//end if command should be fully implemented.
			else if (this.moveCommands[0].type === "moveToBy") {
				if(this.mcTimeStart === -1) {
					this.mcTimeStart 	= stageTime;
					this.mcXStart 		= this.x;
					this.mcYStart 		= this.y;
					//debugPrint( "starting moveToBy command with time,x,y:" + this.mcTimeStart + "," + this.mcXStart + "," + this.mcYStart, "command" );
				}

				var percent 	=  (stageTime - this.mcTimeStart) / (this.moveCommands[0].time - this.mcTimeStart);
				var xdiff 		= this.moveCommands[0].x - this.mcXStart;
				var ydiff 		= this.moveCommands[0].y - this.mcYStart;
				this.x = this.mcXStart + (xdiff * percent);
				this.y = this.mcYStart + (ydiff * percent);
				consolePrint( "x:" + this.x);
				consolePrint( "y:" + this.y );
			}

		} //end if there are commands
	}; //end moveUpdate
	
    /**
    Overrides the death function on entity.
    */
	ent.death = function (deathByDamage) {
		this.removeFromUpdater();
		this.isAlive = false;//set isAlive to false

		//caues explosion before moving offscreen
		var exp = explosionFindFirstDead();
		if(exp !== null) {
			exp.spawnAt( this.x, this.y );
		}

		//score credit the player
		console.log("Death by damage:" + deathByDamage + ". And player ref: " + this.lastHitByPlayer );
		if(deathByDamage !== undefined && deathByDamage && this.lastHitByPlayer !== -1) {
			allPlayers[ this.lastHitByPlayer ].score++;
			console.log("credit score");
		}
		ent.lastHitByPlayer = -1;

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

        invaderSetTypeAttributes(this, type);
    };//takes parameters of where you want to spawn entity 

    /**
	At least for the time being, enemies do not have collision effects on other things.
    */
    ent.collisionEffects = function() {

    };

    /** Adds a movement command. Must be an object. Properties
    	time
    	type
    	x 		not always present
    	y 		not always present
    */
    ent.addMoveCommand = function (mc) { this.moveCommands.push(mc); }; 

    /** Adds a shoot command. Must be an object.
		time
		command type (shootAtTime)
		type
    */
    ent.addShootAtTimeCommand = function (sc) { this.shootAtTimeCommands.push(sc); };
    
    /** Adds a shoot command. Must be an object. 
		time (interval)
		command type (shootAtTime)
		type
		counter ( counts up to interval)
	*/
    ent.addShootIntervalCommand = function (sc) {
    	this.shootIntervalCommands.push(sc);
    	this.shootIntervalCommands[ this.shootIntervalCommands.length - 1 ].counter = 0; ;
    };


    /**
    	Check for shoots that need to be performed at time.
    */
    ent.shootUpdate = function() {
    	//first handle shoot at time
    	for(var i = 0; i < this.shootAtTimeCommands.length; i++) {
    		if(this.shootAtTimeCommands[i].time <= stageTime) {
    			this.shoot( this.shootAtTimeCommands[i].type );
    			this.shootAtTimeCommands.shift();
    			i--;
    		}
    		else {
    			break; //TODO should it be assumed shots are in order?
    		}
    	}

    	//next handle interval shots
    	for(var i = 0; i < this.shootIntervalCommands.length; i++) {
    		this.shootIntervalCommands[i].counter += dTime;
    		if(this.shootIntervalCommands[i].time <= this.shootIntervalCommands[i].counter) {
    			this.shoot(this.shootIntervalCommands[i].type);
    			this.shootIntervalCommands[i].counter = 0;
    		}
    	}

    } //end shootUpdate

    /**
    	Actually makes a shot based off the type description.
    	shot spawn needs:
    	cx,cy (provided by entity)   	dx, dy(provided by "player target") 		speed 		size

    	command comprised of: time, command, type 
    */
    ent.shoot = function (type) {
    	//split the type properties
    	var parts = type.split(",");
    	//set initial values
    	var amountOfShots 	= 1;
    	var speed 			= 100;
    	var size 			= allSpriteObjects['shot'].width;
    	var target 			= "player";

		var px 				= mouseKeys.x; //TODO change this later to a player probably by random determination.
		var py 				= mouseKeys.y;
		var shotref;

    	for(var i = 0; i < parts.length; i++) {
    		if( parts[i].indexOf("amountOfShots") !== -1 ) {
    			amountOfShots = parseInt( parts[i].substring( parts[i].indexOf(":") + 1 ).trim() );
    		}
    		else if( parts[i].indexOf("speed") !== -1 ) {
    			speed = parseInt( parts[i].substring( parts[i].indexOf(":") + 1 ).trim() );
    		}
    		else if( parts[i].indexOf("size") !== -1 ) {
    			size = parseInt( parts[i].substring( parts[i].indexOf(":") + 1 ).trim() );
    		}
    		else if( parts[i].indexOf("target") !== -1 ) {
    			target = parts[i].substring( parts[i].indexOf(":") + 1 ).trim();
    		}
    	}

    	if(target === "player") {

    		var rp;
    		var alivePlayer = false;
    		for(var i = 0; i < allPlayers.length; i++) {
    			if( allPlayers[i].isAlive) { alivePlayer = true; break; }
    		}
    		if(alivePlayer) {
    			rp = parseInt(  Math.random() * allPlayers.length );
    			while( ! allPlayers[rp].isAlive ) { rp = parseInt(  Math.random() * allPlayers.length ); }
    			px = allPlayers[rp].x;
    			py = allPlayers[rp].y;
    		}
    		else {
    			px = cCanvasWidth/2;
    			py = cCanvasHeight;
    		}


    		for(var i = 0; i < amountOfShots; i++) {
    			if(i===0){
    				//ent.spawnAt = function (centerXvalue, centerYvalue, xDestination, yDestination, speed, affliction, size) {
    				shotref = shotFindFirstDead();
    				if(shotref !== null) { shotref.spawnAt( this.x, this.y, 	px, py, 	speed, 		"enemyShot", size); }
			    	else { debugPrint( "Enemy unable to shoot due game reaching shot limit (" + allShots.length + ")", "enemy" ); break;}
    			}
    			//left offset first
    			else if( i % 2 === 1) {
    				shotref = shotFindFirstDead();
    				if(shotref !== null) { shotref.spawnAt( this.x, this.y, 	(px - (size * 3 * Math.ceil(i/2) )) , py, 	speed, 		"enemyShot", size); }
			    	else { debugPrint( "Enemy unable to shoot due game reaching shot limit (" + allShots.length + ")", "enemy" ); break;}
    			}
    			//right offset
    			else if( i % 2 === 0) {
    				shotref = shotFindFirstDead();
    				if(shotref !== null) { shotref.spawnAt( this.x, this.y, 	(px + (size * 3 * Math.ceil( i/2) )) , py, 	speed, 		"enemyShot", size); }
			    	else { debugPrint( "Enemy unable to shoot due game reaching shot limit (" + allShots.length + ")", "enemy" ); break;}
    			}
    		}
    	} //end if target player
    	else if (target === "circleBurst") {
    		var degreeToShoot = 0; // 90 should be directly down.
    		var degreeChange = 360 / amountOfShots;
    		var radians;
    		for(var i = 0; i < amountOfShots; i++) {
    			//radians = degrees * (pi / 180)//
    			radians = degreeToShoot * cPiOver180;
    			px = Math.cos(radians) * 1000; //100 is an arbitrary amount just to get a position to shoot at.
    			py = Math.sin(radians) * 1000;
				shotref = shotFindFirstDead();
				if(shotref !== null) { shotref.spawnAt( this.x, this.y, 	px, py, 	speed, 		"enemyShot", size); }
			    else { debugPrint( "Enemy unable to shoot due game reaching shot limit (" + allShots.length + ")", "enemy" ); break;}
				degreeToShoot += degreeChange;
    		}
    	}





    } //end shoot





	
	allInvaders.push( ent );
	return ent; //DONT FORGET THIS
} //end create Invader



function invaderSetTypeAttributes(ent, type) {
	var attributes = type.split(",");
	var visualToUse = "";
	var hpToUse = 1;


	for(var i = 0; i < attributes.length; i++) {
		//detect visual
		if(attributes[i].indexOf("visual") !== -1) {
			visualToUse = attributes[i].substring( attributes[i].indexOf(":") + 1 ).trim();
		}
		//detect hp
		if(attributes[i].indexOf("hp") !== -1) {
			hpToUse = parseInt( attributes[i].substring( attributes[i].indexOf(":") + 1 ).trim() );
		}
	}

	//currently no visual exists less than 3
	if( allSpriteObjects[visualToUse] === null) { consolePrint( "Error: invader type did not specify valid visual:" + type , "exit"); }

	ent.vImage.setImage( allSpriteObjects[visualToUse] );
	//ent.width = allSpriteObjects['en1'].width;
	//ent.height = allSpriteObjects['en1'].height;
	ent.hp = hpToUse;

} //end invaderSetTypeAttributes




// Create invader sprite and add it to group
function invaderCreateVisual(ref){
	ref.vGroup = new Konva.Group();

	ref.vImage = new Konva.Image({
		x: -1 * allSpriteObjects['en1'].width/2,
		y: -1 * allSpriteObjects['en1'].height/2,
		image: allSpriteObjects['en1'],
		width: allSpriteObjects['en1'].width,
		height: allSpriteObjects['en1'].height
	});
	ref.vGroup.add(ref.vImage);

	ref.width = allSpriteObjects['en1'].width;
	ref.height = allSpriteObjects['en1'].height;

	// ref.vSprite = new Konva.Sprite({
	// 	x: -cInvaderWidth/2,
	// 	y: -cInvaderHeight/2,
	// 	width: cInvaderWidth,
	// 	height: cInvaderHeight,
	// 	image: allSpriteObjects['enemy1'],
	// 	animation: 'idle',
	// 	animations: {
	// 		idle: [
	// 			0,0,32,32,
	// 			32,0,32,32
	// 		]
	// 	},
	// 	frameRate: 8,
	// 	frameIndex: 0
	// });
	// ref.vOrigImage = ref.vSprite.image();
	// ref.vOrigAnim = ref.vSprite.animation();
	// ref.vOrigAnimations = ref.vSprite.animations();
	// ref.vOrigFrameRate = ref.vSprite.frameRate();
	//ref.vGroup.add(ref.vSprite);
	// if(ref.shootingDirection === 'left') {
	// 	ref.vGroup.rotate(90);
	// }else{
	// 	ref.vGroup.rotate(-90);
	// }
	// ref.vSprite.start();



} //end invaderCreateVisual



function invaderFindFirstDeadIndex() {
	for(var i = 0; i < allInvaders.length; i++) {
		if(!allInvaders[i].isAlive) {
			return i;
		}
	}
	return -1;
}


function invaderFindFirstDead() {
	var i = invaderFindFirstDeadIndex();
	if ( i === -1 ) { return null; }
	return allInvaders[ i ];
} //end invaderFindFirstDead


























