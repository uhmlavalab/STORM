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
	@return a rect the same size and position of the entity. 
	*/
	ent.getHitBox = function () {
		var rect = {};//create hit box object
			rect.x = this.x;//copy over dimensions and position
			rect.y = this.y;
			rect.width = this.width;
			rect.height = this.height;
		return rect;
	};

	/**
	Apply damage to the entity.
	*/
	ent.damage = function (amountOfDamageBeingTaken) {
		if(isAlive) {
			var currentHp = this.hp;//gets current hp
			currentHp = currentHp - amountOfDamageBeingTaken;//calculates damage
			debugPrint('DAMAGE confirm hp:' + currentHp + ' ent hp:' + this.hp + "damage amount: " +amountOfDamageBeingTaken, "entity");
			if (currentHp <= 0) {//hp check
				this.death();//call to the Death function 
			}
		}
	};
	
	/**
	death is not implemented for entity.
	*/
	ent.death = function () { console.log("Error entity death accessed.");  };
	
	/**
	spawnAt is not implemented for entity.
	*/
	ent.spawnAt = function () { console.log("Error entity spawnAt accessed."); };//takes parameters of where you want to spawn entity	


	/**
	Moves the visual group to the entity values.
	Should be called at the end of move update.
	*/
	ent.moveVisualsToCoordinates = function () {
		this.vGroup.x( this.x );
		this.vGroup.y( this.y );
	};

	allEntities.push( ent ); //everything should call this to be created for mechanical updates.
	return ent; //DONT FORGET THIS
} //end createEntity

