/*
createEntity.js


Entities are comprised of
	Properties:
		x
		y
		width
		height
		hp
		type
		isAlive
	functions:
		update
		moveUpdate
		getHitBox
		damage
		death
		spawnAt
		moveVisualsToCoordinates




*/

/*---------------------------------------------------------------------------------------------------------
Don't call this directly. Creates an entity.
*/
function createEntity() {
	var ent = {};//this is the entity being created
		ent.x 		= -100; //center
		ent.y 		= -100; //center
		ent.width 	= -1;
		ent.height 	= -1;
		ent.hp 		= 0; //by default created entities start off "dead" in a blank state.
		ent.type 	= "entity";
		ent.isAlive = false;
		ent.vGroup 	= null; //this is for the visuals

	/**
	update is not implemented for entity.
	*/
	ent.update = function() { console.log("Error entity update accessed"); }

	/**
	moveUpdate is not implemented for entity.
	*/
	ent.moveUpdate = function () { console.log("Error entity move accessed."); };
	
	/**
	death is not implemented for entity.
	*/
	ent.death = function () { console.log("Error entity death accessed.");  };
	
	/**
	spawnAt is not implemented for entity.
	*/
	ent.spawnAt = function () { console.log("Error entity spawnAt accessed."); };//takes parameters of where you want to spawn entity	

	/**
	spawnAt is not implemented for entity.
	*/
	ent.collisionEffects = function () { console.log("Error entity collisionEffects accessed."); };//takes parameters of where you want to spawn entity	

	/**
	@return a rect the same size and position of the entity. 
	*/
	ent.getEncompassingRectangle = function () {
		var rect = {};//create hit box object
			rect.x = this.x - this.width/2;//copy over dimensions and position
			rect.y = this.y - this.height/2;
			rect.width = this.width;
			rect.height = this.height;
		return rect;
	};

	/**
	Apply damage to the entity.
	*/
	ent.damage = function (amountOfDamageBeingTaken) {
		if(this.isAlive) {
			this.hp -= amountOfDamageBeingTaken;
			//debugPrint('DAMAGE confirm hp:' + currentHp + ' ent hp:' + this.hp + "damage amount: " +amountOfDamageBeingTaken, "entity");
			if (this.hp <= 0) {//hp check
				this.death(true);//call to the Death function 
			}
		}
	};

	/**
	Moves the visual group to the entity values.
	Should be called at the end of move update.
	*/
	ent.moveVisualsToCoordinates = function () {
		this.vGroup.x( this.x );
		this.vGroup.y( this.y );
	};

	/**
	Used to add to the updater.
	*/ 
	ent.addToUpdater = function () {
		var aetui = allEntitiesToUpdate.indexOf(this);
		if(aetui === -1) { allEntitiesToUpdate.push(this); }
	};

	/**
	Used to add to the updater.
	*/ 
	ent.removeFromUpdater = function () {
		var aetui = allEntitiesToUpdate.indexOf(this);
		while(aetui > -1) {
			allEntitiesToUpdate.splice( aetui, 1 );
			aetui = allEntitiesToUpdate.indexOf(this);
		}
	};



	allEntities.push( ent ); //everything should call this to be created for mechanical updates.
	return ent; //DONT FORGET THIS
} //end createEntity
