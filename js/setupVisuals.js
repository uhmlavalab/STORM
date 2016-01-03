

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
		fill: 'lightgray'
	});
	grayBacking.add(grayback);

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

	allSpriteObjects['ac1'] = new Image();
	allSpriteObjects['ac1'].src = 'assets/aircraft_1.png';
	allSpriteObjects['ac2'] = new Image();
	allSpriteObjects['ac2'].src = 'assets/aircraft_2.png';
	allSpriteObjects['ac3'] = new Image();
	allSpriteObjects['ac3'].src = 'assets/aircraft_3.png';
	allSpriteObjects['ac4'] = new Image();
	allSpriteObjects['ac4'].src = 'assets/aircraft_4.png';
	allSpriteObjects['ac5'] = new Image();
	allSpriteObjects['ac5'].src = 'assets/aircraft_5.png';
	allSpriteObjects['ac6'] = new Image();
	allSpriteObjects['ac6'].src = 'assets/aircraft_6.png';

	allSpriteObjects['en1'] = new Image();
	allSpriteObjects['en1'].src = 'assets/enemy_1.png';
	allSpriteObjects['en2'] = new Image();
	allSpriteObjects['en2'].src = 'assets/enemy_2.png';
	allSpriteObjects['en3'] = new Image();
	allSpriteObjects['en3'].src = 'assets/enemy_3.png';

	allSpriteObjects['shot'] = new Image();
	allSpriteObjects['shot'].src = 'assets/shoot_simple.png';

	allSpriteObjects['explode1'] = new Image();
	allSpriteObjects['explode1'].src = 'assets/explosion_1.png';
	allSpriteObjects['explode2'] = new Image();
	allSpriteObjects['explode2'].src = 'assets/explosion_2.png';



} //end setupSpriteImageObjects












/*
One time call from main.
Creates all visuals to be used in the menu gameState.
*/
function setupMenuVisuals() {

	allMenuVisuals = {};
	allMenuVisuals.backLayer = {};
	allMenuVisuals.midLayer = {};
	allMenuVisuals.frontLayer = {};

	var amv = allMenuVisuals.midLayer;

	amv.title = new Konva.Text({
		text: 'SIEGE',
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
	allGameVisuals.backLayer = {};
	allGameVisuals.midLayer = {};
	allGameVisuals.frontLayer = {};

	var agv = allGameVisuals.backLayer; //-------------------------------------------------backlayer

	agv.blackBackdrop = new Konva.Rect({
		x:0,
		y:0,
		width:cCanvasWidth,
		height:cCanvasHeight,
		fill: 'darkgray'
	});
	//create the players, invaders, and shots in the back layer

	for(var i = 0; i < 4; i++) {
		createPlayer();
		agv["player"+i] = allPlayers[i].vGroup;
	}
	for(var i = 0; i < 100; i++) {
		createInvader();
		agv["invader"+i] = allInvaders[i].vGroup;
	}
	for(var i = 0; i < 100; i++) {
		createShot();
		agv["shot"+i] = allShots[i].vGroup;
	}

	agv = allGameVisuals.midLayer; //-------------------------------------------------midlayer

	//make explosions in the back layer (unsure if ok here)
	for(var i = 0; i < 20; i++) {
		createExplosion();
		agv["explosion"+i] = allExplosions[i].vGroup;
		allExplosions[i].death();
	}



	agv = allGameVisuals.frontLayer; //-------------------------------------------------frontLayer


} //end setupGameVisuals
















































/*
One time call from main.
Creates all visuals to be used in the result gameState.
*/
function setupResultVisuals() {

	allResultVisuals = {};
	allResultVisuals.backLayer = {};
	allResultVisuals.midLayer = {};
	allResultVisuals.frontLayer = {};

	var arv = allResultVisuals.midLayer;

	arv.player1Title = new Konva.Text({
		text: 'Player 1',
		fontSize: 30,
		fontFamily: 'Arial',
		fill: 'green'
	});
	arv.player1Title.x( cCanvasWidth/4 - arv.player1Title.getTextWidth()/2 );
	arv.player1Title.y( cCanvasHeight * 0.1 );

	arv.p1c1 =  new Konva.Text({
		text: 'A',
		fontSize: 30,
		fontFamily: 'Arial',
		fill: 'green'
	});
	arv.p1c1.x( cCanvasWidth/4 - arv.p1c1.getTextWidth()/2 - arv.p1c1.getTextWidth() );
	arv.p1c1.y( cCanvasHeight / 2 );

	arv.p1c2 =  new Konva.Text({
		text: 'A',
		fontSize: 30,
		fontFamily: 'Arial',
		fill: 'green'
	});
	arv.p1c2.x( cCanvasWidth/4 - arv.p1c2.getTextWidth()/2 );
	arv.p1c2.y( cCanvasHeight / 2 );

	arv.p1c3 =  new Konva.Text({
		text: 'A',
		fontSize: 30,
		fontFamily: 'Arial',
		fill: 'green'
	});
	arv.p1c3.x( cCanvasWidth/4 - arv.p1c3.getTextWidth()/2 + arv.p1c3.getTextWidth() );
	arv.p1c3.y( cCanvasHeight / 2 );



	arv.player2Title = new Konva.Text({
		text: 'Player 2',
		fontSize: 30,
		fontFamily: 'Arial',
		fill: 'green'
	});
	arv.player2Title.x( cCanvasWidth/4 * 3  - arv.player2Title.getTextWidth()/2 );
	arv.player2Title.y( cCanvasHeight * 0.1 );

	arv.p2c1 =  new Konva.Text({
		text: 'A',
		fontSize: 30,
		fontFamily: 'Arial',
		fill: 'green'
	});
	arv.p2c1.x( cCanvasWidth/4 * 3 - arv.p2c1.getTextWidth()/2 - arv.p2c1.getTextWidth() );
	arv.p2c1.y( cCanvasHeight / 2 );

	arv.p2c2 =  new Konva.Text({
		text: 'A',
		fontSize: 30,
		fontFamily: 'Arial',
		fill: 'green'
	});
	arv.p2c2.x( cCanvasWidth/4 * 3 - arv.p2c2.getTextWidth()/2 );
	arv.p2c2.y( cCanvasHeight / 2 );

	arv.p2c3 =  new Konva.Text({
		text: 'A',
		fontSize: 30,
		fontFamily: 'Arial',
		fill: 'green'
	});
	arv.p2c3.x( cCanvasWidth/4 * 3 - arv.p2c3.getTextWidth()/2 + arv.p2c3.getTextWidth() );
	arv.p2c3.y( cCanvasHeight / 2 );



	var arv = allResultVisuals.frontLayer;

	arv.p1block = new Konva.Rect({
		x: allResultVisuals.midLayer.p1c1.x(),
		y: allResultVisuals.midLayer.p1c1.y(),
		width: allResultVisuals.midLayer.p1c1.getTextWidth(),
		height: allResultVisuals.midLayer.p1c1.getTextHeight(),
		fill: 'green'
	});

	arv.p2block = new Konva.Rect({
		x: allResultVisuals.midLayer.p2c1.x(),
		y: allResultVisuals.midLayer.p2c1.y(),
		width: allResultVisuals.midLayer.p2c1.getTextWidth(),
		height: allResultVisuals.midLayer.p2c1.getTextHeight(),
		fill: 'green'
	});
    
   allResultVisuals.midLayer.winner = new Konva.Text({
        text: 'Testing',
		fontSize: 30,
		fontFamily: 'Arial',
		fill: 'green'
    });
    
    allResultVisuals.midLayer.winner.x( cCanvasWidth/2 - allResultVisuals.midLayer.winner.getTextWidth()/2 );
    allResultVisuals.midLayer.winner.y( cCanvasHeight/4 - allResultVisuals.midLayer.winner.getTextHeight()/2);

} //end setupResultVisuals








/*------------------------------------------------------------------------------------------------------
Use to switch all visuals to specified visual object.
Does clear out all visual from the layers.
*/
function placeScreenVisuals( allScreenVisuals ) {
	removeAllChildrenFromLayers();

	if(debug) { console.log('---adding screen visuals--------------------------------------------------------------------'); }
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
	backLayer.removeChildren();
	midLayer.removeChildren();
	frontLayer.removeChildren();
} //end removeAllChildrenFromLayers











