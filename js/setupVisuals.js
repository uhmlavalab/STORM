

/* ------------------------------------------------------------------------------------------------------------------

setupKonvaCanvas()
setupSpriteImageObjects()

setupMenuVisuals() 
setupGameVisuals() 
setupResultVisuals()

placeScreenVisuals()

*/




/*
Used once in main to create all canvas variables.
*/
function setupKonvaCanvas() {
	stage = new Konva.Stage({
		width: cCanvasWidth,
		height: cCanvasHeight,
		container: 'topdiv'
	});

	var grayBacking = new Konva.Layer();
	stage.add(grayBacking);

	var grayback = new Konva.Rect({
		x:0,
		y:0,
		width:cCanvasWidth,
		height:cCanvasHeight,
		fill: 'black'
	});
	grayBacking.add(grayback);

	bgLayer = new Konva.Layer();
	stage.add(bgLayer);

	backLayer = new Konva.Layer();
	stage.add(backLayer);

	midLayer = new Konva.Layer();
	stage.add(midLayer);

	frontLayer = new Konva.Layer();
	stage.add(frontLayer);

	stage.draw();
} //end setupKonvaCanvas

/*
One time call from main.
Load all necessary image objects here so there is only 1 object, and many things  can reference it.
Doing this saves time and memory.
*/
function setupSpriteImageObjects() {
	allSpriteObjects = {};

	//aircraft
	allSpriteObjects['ac1'] = new Image();
	allSpriteObjects['ac1'].src = 'assets/aircraft_1.png';
	allSpriteObjects['ac2'] = new Image();
	allSpriteObjects['ac2'].src = 'assets/aircraft_2.png';
	// allSpriteObjects['ac3'] = new Image();
	// allSpriteObjects['ac3'].src = 'assets/aircraft_3.png';
	allSpriteObjects['ac3'] = new Image();
	allSpriteObjects['ac3'].src = 'assets/aircraft_3_outline.png';
	allSpriteObjects['ac4'] = new Image();
	allSpriteObjects['ac4'].src = 'assets/aircraft_4.png';
	allSpriteObjects['ac5'] = new Image();
	allSpriteObjects['ac5'].src = 'assets/aircraft_5.png';
	allSpriteObjects['ac6'] = new Image();
	allSpriteObjects['ac6'].src = 'assets/aircraft_6.png';

	//enemy
	allSpriteObjects['en1'] = new Image();
	allSpriteObjects['en1'].src = 'assets/enemy_1.png';
	allSpriteObjects['en2'] = new Image();
	allSpriteObjects['en2'].src = 'assets/enemy_2.png';
	allSpriteObjects['en3'] = new Image();
	allSpriteObjects['en3'].src = 'assets/enemy_3.png';

	//shot
	allSpriteObjects['shot'] = new Image();
	allSpriteObjects['shot'].src = 'assets/shoot_simple.png';

	//explosion
	allSpriteObjects['explode1'] = new Image();
	allSpriteObjects['explode1'].src = 'assets/explosion_1.png';
	allSpriteObjects['explode2'] = new Image();
	allSpriteObjects['explode2'].src = 'assets/explosion_2.png';

	//background
	allSpriteObjects['hole'] = new Image();
	allSpriteObjects['hole'].src = 'assets/hole.png';
	allSpriteObjects['planet1'] = new Image();
	allSpriteObjects['planet1'].src = 'assets/planet_1.png';
	allSpriteObjects['planet2'] = new Image();
	allSpriteObjects['planet2'].src = 'assets/planet_2.png';
	allSpriteObjects['planet3'] = new Image();
	allSpriteObjects['planet3'].src = 'assets/planet_3.png';
	allSpriteObjects['stars1'] = new Image();
	allSpriteObjects['stars1'].src = 'assets/stars.png';
	allSpriteObjects['stars2'] = new Image();
	allSpriteObjects['stars2'].src = 'assets/stars_2.png';
	allSpriteObjects['stars3'] = new Image();
	allSpriteObjects['stars3'].src = 'assets/stars_3.png';

	allSpriteObjects['gameover'] = new Image();
	allSpriteObjects['gameover'].src = 'assets/gameover.png';



} //end setupSpriteImageObjects












/*
One time call from main.
Creates all visuals to be used in the menu gameState.
*/
function setupMenuVisuals() {

	allMenuVisuals = {};
	allMenuVisuals.bgLayer 		= {};
	allMenuVisuals.backLayer 	= {};
	allMenuVisuals.midLayer 	= {};
	allMenuVisuals.frontLayer 	= {};

	var amv = allMenuVisuals.bgLayer;

	amv.s1 = new Konva.Image({
		x: allSpriteObjects['stars1'].width/2,
		y: 0,
		image: allSpriteObjects['stars1'],
		width: cCanvasWidth,
		height: cCanvasHeight
	});
	amv.s2 = new Konva.Image({
		x: allSpriteObjects['stars2'].width/2,
		y: 0,
		image: allSpriteObjects['stars2'],
		width: cCanvasWidth,
		height: cCanvasHeight
	});
	amv.s3 = new Konva.Image({
		x: allSpriteObjects['stars3'].width/2,
		y: 0,
		image: allSpriteObjects['stars3'],
		width: cCanvasWidth,
		height: cCanvasHeight
	});
	var temp;
	amv.p1 = new Konva.Group();
	temp = new Konva.Image({
		x: -1 * allSpriteObjects['planet1'].width/2,
		y: -1 * allSpriteObjects['planet1'].height/2,
		image: allSpriteObjects['planet1'],
		width: allSpriteObjects['planet1'].width,
		height: allSpriteObjects['planet1'].height
	});
	amv.p1.add(temp);
	amv.p2 = new Konva.Group();
	temp = new Konva.Image({
		x: -1 * allSpriteObjects['planet2'].width/2,
		y: -1 * allSpriteObjects['planet2'].height/2,
		image: allSpriteObjects['planet2'],
		width: allSpriteObjects['planet2'].width,
		height: allSpriteObjects['planet2'].height
	});
	amv.p2.add(temp);
	amv.p3 = new Konva.Group();
	temp = new Konva.Image({
		x: allSpriteObjects['planet3'].width/2,
		y: -1 * allSpriteObjects['planet3'].height/2,
		image: allSpriteObjects['planet3'],
		width: allSpriteObjects['planet3'].width,
		height: allSpriteObjects['planet3'].height
	});
	amv.p3.add(temp);

	amv = allMenuVisuals.midLayer;

	amv.title = new Konva.Text({
		text: 'STORM',
		fontSize: cCanvasHeight * 0.15,
		fontFamily: 'Arial',
		fill: 'green'
	});
	amv.title.x( cCanvasWidth/2 - amv.title.getTextWidth()/2 );
	amv.title.y( cCanvasHeight * 0.1);


	amv.howToStart = new Konva.Text({
		text: '<Press ENTER or hold a button on both controllers to start>',
		fontSize: cCanvasHeight * 0.03,
		fontFamily: 'Arial',
		fill: 'green'
	});
	amv.howToStart.x( cCanvasWidth/2 - amv.howToStart.getTextWidth()/2 );
	amv.howToStart.y( cCanvasHeight * 0.3);


	amv.highScore = new Konva.Text({
		text: 'HIGH SCORES',
		fontSize: cCanvasHeight * 0.06,
		fontFamily: 'Courier',
		fill: 'green'
	});
	amv.highScore.x( cCanvasWidth/2 - amv.highScore.getTextWidth()/2 );
	amv.highScore.y( cCanvasHeight * 0.5);


	amv.topScore1 = new Konva.Text({
		text: 'asdf',
		fontSize: cCanvasHeight * 0.04,
		fontFamily: 'Courier',
		fill: 'green'
	});
	amv.topScore1.x( amv.highScore.x() + 80 );
	amv.topScore1.y( cCanvasHeight * 0.57 );
	amv.topScore1.text( 'nobody know' );

	amv.topScore2 = new Konva.Text({
		text: 'asdf',
		fontSize: cCanvasHeight * 0.04,
		fontFamily: 'Courier',
		fill: 'green'
	});
	amv.topScore2.x( amv.highScore.x() + 80 );
	amv.topScore2.y( cCanvasHeight * 0.57 + amv.topScore1.getTextHeight() );
	amv.topScore2.text( 'the trouble' );

	amv.topScore3 = new Konva.Text({
		text: 'asdf',
		fontSize: cCanvasHeight * 0.04,
		fontFamily: 'Courier',
		fill: 'green'
	});
	amv.topScore3.x( amv.highScore.x() + 80 );
	amv.topScore3.y( cCanvasHeight * 0.57 + amv.topScore1.getTextHeight() * 2 );
	amv.topScore3.text( 'ive seen' );


} //end setupMenuVisuals










/*
One time call from main.
Creates all visuals to be used in the game gameState.
*/
function setupGameVisuals() {


	allGameVisuals = {};
	allGameVisuals.bgLayer 		= {};
	allGameVisuals.backLayer 	= {};
	allGameVisuals.midLayer 	= {};
	allGameVisuals.frontLayer 	= {};


	var agv = allGameVisuals.bgLayer; //-------------------------------------------------backlayer

	agv.blackBackdrop = new Konva.Rect({
		x:0,
		y:0,
		width:cCanvasWidth,
		height:cCanvasHeight,
		fill: 'black'
	});

	agv.s1 = new Konva.Image({
		x: allSpriteObjects['stars1'].width/2,
		y: 0,
		image: allSpriteObjects['stars1'],
		width: cCanvasWidth,
		height: cCanvasHeight
	});
	agv.s2 = new Konva.Image({
		x: allSpriteObjects['stars2'].width/2,
		y: 0,
		image: allSpriteObjects['stars2'],
		width: cCanvasWidth,
		height: cCanvasHeight
	});
	agv.s3 = new Konva.Image({
		x: allSpriteObjects['stars3'].width/2,
		y: 0,
		image: allSpriteObjects['stars3'],
		width: cCanvasWidth,
		height: cCanvasHeight
	});

	var temp;
	agv.hole = new Konva.Group();
	temp	= new Konva.Image({
		x: -1 * allSpriteObjects['hole'].width/2,
		y: -1 * allSpriteObjects['hole'].height/2,
		image: allSpriteObjects['hole'],
		width: allSpriteObjects['hole'].width,
		height: allSpriteObjects['hole'].height
	});
	agv.hole.add(temp);
	agv.p1 = new Konva.Group();
	temp = new Konva.Image({
		x: -1 * allSpriteObjects['planet1'].width/2,
		y: -1 * allSpriteObjects['planet1'].height/2,
		image: allSpriteObjects['planet1'],
		width: allSpriteObjects['planet1'].width,
		height: allSpriteObjects['planet1'].height
	});
	agv.p1.add(temp);
	agv.p2 = new Konva.Group();
	temp = new Konva.Image({
		x: -1 * allSpriteObjects['planet2'].width/2,
		y: -1 * allSpriteObjects['planet2'].height/2,
		image: allSpriteObjects['planet2'],
		width: allSpriteObjects['planet2'].width,
		height: allSpriteObjects['planet2'].height
	});
	agv.p2.add(temp);
	agv.p3 = new Konva.Group();
	temp = new Konva.Image({
		x: allSpriteObjects['planet3'].width/2,
		y: -1 * allSpriteObjects['planet3'].height/2,
		image: allSpriteObjects['planet3'],
		width: allSpriteObjects['planet3'].width,
		height: allSpriteObjects['planet3'].height
	});
	agv.p3.add(temp);

	/*
	//preserved in case need to recover original references.
	agv.hole = new Konva.Layer();
	agv.holeImage	= new Konva.Image({
		x: -1 * allSpriteObjects['hole'].width/2,
		y: -1 * allSpriteObjects['hole'].height/2,
		image: allSpriteObjects['hole'],
		width: allSpriteObjects['hole'].width,
		height: allSpriteObjects['hole'].height
	});
	agv.hole.add(agv.holeImage);
	agv.p1 = new Konva.Layer();
	agv.p1Image = new Konva.Image({
		x: -1 * allSpriteObjects['planet1'].width/2,
		y: -1 * allSpriteObjects['planet1'].height/2,
		image: allSpriteObjects['planet1'],
		width: allSpriteObjects['planet1'].width,
		height: allSpriteObjects['planet1'].height
	});
	agv.p1.add(agv.p1Image);
	agv.p2 = new Konva.Layer();
	agv.p2Image = new Konva.Image({
		x: -1 * allSpriteObjects['planet2'].width/2,
		y: -1 * allSpriteObjects['planet2'].height/2,
		image: allSpriteObjects['planet2'],
		width: allSpriteObjects['planet2'].width,
		height: allSpriteObjects['planet2'].height
	});
	agv.p2.add(agv.p2Image);
	agv.p3 = new Konva.Layer();
	agv.p3Image = new Konva.Image({
		x: allSpriteObjects['planet3'].width/2,
		y: -1 * allSpriteObjects['planet3'].height/2,
		image: allSpriteObjects['planet3'],
		width: allSpriteObjects['planet3'].width,
		height: allSpriteObjects['planet3'].height
	});
	agv.p3.add(agv.p2Image);
	*/



	agv = allGameVisuals.backLayer; //-------------------------------------------------backlayer

	//create the players, invaders, and shots in the back layer

	for(var i = 0; i < 4; i++) {
		createPlayer();
		agv["player"+i] = allPlayers[i].vGroup;
	}
	for(var i = 0; i < cGameEnemyLimit; i++) {
		createInvader();
		agv["invader"+i] = allInvaders[i].vGroup;
	}
	for(var i = 0; i < cGameShotLimit; i++) {
		createShot();
		agv["shot"+i] = allShots[i].vGroup;
	}

	agv = allGameVisuals.midLayer; //-------------------------------------------------midlayer

	//make explosions in the back layer (unsure if ok here)
	for(var i = 0; i < cGameExplosionLimit; i++) {
		createExplosion();
		agv["explosion"+i] = allExplosions[i].vGroup;
		allExplosions[i].death();
	}



	agv = allGameVisuals.frontLayer; //-------------------------------------------------frontLayer

	agv.gameover = new Konva.Image({
		x:  cCanvasWidth/2 - allSpriteObjects['gameover'].width/2,
		y: -1 *  allSpriteObjects['gameover'].height,
		image: allSpriteObjects['gameover'],
		width: allSpriteObjects['gameover'].width,
		height: allSpriteObjects['gameover'].height
	});


} //end setupGameVisuals




















/*
One time call from main.
Creates all visuals to be used in the result gameState.
*/
function setupResultVisuals() {

	allResultVisuals = {};
	allResultVisuals.bgLayer 	= {};
	allResultVisuals.backLayer 	= {};
	allResultVisuals.midLayer 	= {};
	allResultVisuals.frontLayer = {};

	var arv = allResultVisuals.bgLayer;

	arv.s1 = new Konva.Image({
		x: allSpriteObjects['stars1'].width/2,
		y: 0,
		image: allSpriteObjects['stars1'],
		width: cCanvasWidth,
		height: cCanvasHeight
	});
	arv.s2 = new Konva.Image({
		x: allSpriteObjects['stars2'].width/2,
		y: 0,
		image: allSpriteObjects['stars2'],
		width: cCanvasWidth,
		height: cCanvasHeight
	});
	arv.s3 = new Konva.Image({
		x: allSpriteObjects['stars3'].width/2,
		y: 0,
		image: allSpriteObjects['stars3'],
		width: cCanvasWidth,
		height: cCanvasHeight
	});
	var temp;
	arv.p1 = new Konva.Group();
	temp = new Konva.Image({
		x: -1 * allSpriteObjects['planet1'].width/2,
		y: -1 * allSpriteObjects['planet1'].height/2,
		image: allSpriteObjects['planet1'],
		width: allSpriteObjects['planet1'].width,
		height: allSpriteObjects['planet1'].height
	});
	arv.p1.add(temp);
	arv.p2 = new Konva.Group();
	temp = new Konva.Image({
		x: -1 * allSpriteObjects['planet2'].width/2,
		y: -1 * allSpriteObjects['planet2'].height/2,
		image: allSpriteObjects['planet2'],
		width: allSpriteObjects['planet2'].width,
		height: allSpriteObjects['planet2'].height
	});
	arv.p2.add(temp);
	arv.p3 = new Konva.Group();
	temp = new Konva.Image({
		x: allSpriteObjects['planet3'].width/2,
		y: -1 * allSpriteObjects['planet3'].height/2,
		image: allSpriteObjects['planet3'],
		width: allSpriteObjects['planet3'].width,
		height: allSpriteObjects['planet3'].height
	});
	arv.p3.add(temp);



	arv = allResultVisuals.midLayer;

	for(var i=0; i < allPlayers.length; i++) {
		arv = allResultVisuals.midLayer;
		//make their marker
		arv["player" + (i+1) + "Title"] = new Konva.Text({
			text: 'Player ' + (i+1),
			fontSize: 30,
			fontFamily: 'Arial',
			fill: 'green'
		});
		arv["player" + (i+1) + "Title"].x( cCanvasWidth/2 - arv["player" + (i+1) + "Title"].getTextWidth() * 1.5 );
		arv["player" + (i+1) + "Title"].y( cCanvasHeight/4 + ( 2 * i * arv["player" + (i+1) + "Title"].getTextHeight()) );
		//make char 1
		arv["player" + (i+1) + "c1"] =   new Konva.Text({
			text: 'A',
			fontSize: 30,
			fontFamily: 'Arial',
			fill: 'green'
		});
		arv["player" + (i+1) + "c1"].x( cCanvasWidth/2);
		arv["player" + (i+1) + "c1"] .y( arv["player" + (i+1) + "Title"].y() );
		//make char 2
		arv["player" + (i+1) + "c2"] =   new Konva.Text({
			text: 'A',
			fontSize: 30,
			fontFamily: 'Arial',
			fill: 'green'
		});
		arv["player" + (i+1) + "c2"].x( cCanvasWidth/2 + arv["player" + (i+1) + "c2"].getTextWidth() );
		arv["player" + (i+1) + "c2"] .y( arv["player" + (i+1) + "Title"].y() );
		//make char 3
		arv["player" + (i+1) + "c3"] =   new Konva.Text({
			text: 'A',
			fontSize: 30,
			fontFamily: 'Arial',
			fill: 'green'
		});
		arv["player" + (i+1) + "c3"].x( cCanvasWidth/2 + 2 * arv["player" + (i+1) + "c3"].getTextWidth() );
		arv["player" + (i+1) + "c3"] .y( arv["player" + (i+1) + "Title"].y() );
		//make score 
		arv["player" + (i+1) + "score"] =   new Konva.Text({
			text: 'Score:',
			fontSize: 30,
			fontFamily: 'Arial',
			fill: 'green'
		});
		arv["player" + (i+1) + "score"].x( cCanvasWidth/2 + 5 * arv["player" + (i+1) + "c3"].getTextWidth() );
		arv["player" + (i+1) + "score"] .y( arv["player" + (i+1) + "Title"].y() );
		
		//add the green block
		arv = allResultVisuals.frontLayer;
		arv["player" + (i+1) + "block"] = new Konva.Rect({
			x: allResultVisuals.midLayer["player" + (i+1) + "c1"].x(),
			y: allResultVisuals.midLayer["player" + (i+1) + "c1"].y(),
			width: allResultVisuals.midLayer["player" + (i+1) + "c1"].getTextWidth(),
			height: allResultVisuals.midLayer["player" + (i+1) + "c1"].getTextHeight(),
			fill: 'green'
		});

	} //end for each player

   allResultVisuals.midLayer.winner = new Konva.Text({
        text: 'Input your names, press Enter when done',
		fontSize: 30,
		fontFamily: 'Arial',
		fill: 'green'
    });
    allResultVisuals.midLayer.winner.x( cCanvasWidth/2 - allResultVisuals.midLayer.winner.getTextWidth()/2 );
    allResultVisuals.midLayer.winner.y( cCanvasHeight/5 - allResultVisuals.midLayer.winner.getTextHeight()/2);

} //end setupResultVisuals








/*------------------------------------------------------------------------------------------------------
Use to switch all visuals to specified visual object.
Does clear out all visual from the layers.
*/
function placeScreenVisuals( allScreenVisuals ) {
	removeAllChildrenFromLayers();

	if(debug) { console.log('---adding screen visuals--------------------------------------------------------------------'); }
	for ( var key in allScreenVisuals.bgLayer ) {
		if(debug) { console.log( 'adding visual: ' + key ); }
		bgLayer.add( allScreenVisuals.bgLayer[key] );
	}
	for ( var key in allScreenVisuals.backLayer ) {
		if(debug) { console.log( 'adding visual: ' + key ); }
		backLayer.add( allScreenVisuals.backLayer[key] );
	}
	for ( var key in allScreenVisuals.midLayer ) {
		if(debug) { console.log( 'adding visual: ' + key ); }
		midLayer.add( allScreenVisuals.midLayer[key] );
	}
	for ( var key in allScreenVisuals.frontLayer ) {
		if(debug) { console.log( 'adding visual: ' + key ); }
		frontLayer.add( allScreenVisuals.frontLayer[key] );
	}

} //end placeScreenVisuals


//------------------------------------------------------------------------------------------------------

function removeAllChildrenFromLayers() {
	bgLayer.removeChildren();
	backLayer.removeChildren();
	midLayer.removeChildren();
	frontLayer.removeChildren();
} //end removeAllChildrenFromLayers











