window.location="#About";

/****Global vars****/
var loaded = false; //after splash screen = true, allow for loading tile images
var board = [];  //sets up the tiles
const tileRows = 10;   //# of tile rows
const tileCols = 10;   //# of tile columns
const areaRows = 2;    // # of area(array of tiles) rows
const areaCols = 2;    //# pf area(array of tiles) columns
const FOGOFWAR = true; //hide complete vision of the map, only see in a radius of 1 tile.
var turn = 0; //number of actions taken
var turnLimit = 300;
var dragon = 0;
var treasure = 0;
var score=0;
var restCounter = 0;
var moveCounter = 0;
var gameOver = false;
var activeTile = 12;
/****Set up the Board****/
$("#BoardGame").css({"width": 52*tileCols+"px","height":52*tileRows+"px"});                
for(let i = 1; i<=tileRows*tileCols; i++){
	board.push("<div class='Tile' draggable='false' data-id='"+i+"' data-state='"+0+"'></div>");
}
$('#BoardGame').html(board.join(''));
function getTileString(tileID){
	return '.Tile[data-id=\''+tileID+'\']';
}

function area(arrUnk,arrMou,arrGra,arrWat,arrSno,arrRoa,arrTre){
	this.tileTypes=[arrUnk, arrMou, arrGra, arrWat, arrSno, arrRoa, arrTre];
}
//data for each area of tiles. Probably not the best way to do it, but oh well. Limited time and all that.
var area1 = new area([4, 5, 6, 7, 8, 9, 10, 14, 15, 16, 17, 18, 19, 20, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100], [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 21, 22, 23, 25, 26, 27, 28, 29, 30, 31, 40, 41, 50, 51, 60, 61, 64, 65, 70, 71, 74, 75, 80, 81, 91, 93, 94, 95, 96, 97, 98], [45,46,47,48,49,53,63,73,83,93], [89,90,100], [82, 92, 95, 97, 99], [12,13,14,15,16,17,18,19,20,24,32,33,34,35,36,37,38,39,42,43,44,52,54,55,56,57,58,59,62,66,67,68,69,72,76,77,78,79,84,85,86,87,88],[39,84]);
var area2 = new area([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100],[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 20, 21, 22, 23, 26, 28, 29, 30, 31, 36, 40, 41, 46, 47, 50, 51, 52, 53, 56, 57, 60, 61, 66, 67, 70, 71, 76, 77, 80, 86, 90, 93, 94, 95, 96, 97, 98,100],[], [62,63,64,65,72,73,74,75,81,82,83,84,85,91,92], [24,25,27,32,33,34,35,37,38,39,42,43,44,45,48,49,54,55,58,59,68,69,78,79,87,88,89,99], [11,12,13,14,15,16,17,18,19],[19,42,52,73,87]);

var area3 = new area([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100],[1, 3, 4, 5, 6, 7, 8, 11, 20, 21, 22, 23, 24, 25, 26, 27, 30, 31, 40, 41, 50, 51, 52, 53, 54, 55, 56, 57, 60, 61, 70, 71, 72, 73, 74, 75, 76, 77, 78, 80, 81, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100],[62,63,68,69,82,83,84,87,88], [10,32,33,34,42,43,44,], [2,9,11,12,13,14,15,16,17,18,19,28,29,35,36,37,38,39,45,46,47,48,49,64,65,66,67,85,86], [58,59,68,69,79,89,90],[10,62,82]);

var area4 = new area([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100],[3, 4, 5, 6, 7, 8, 10, 11, 20, 21, 22, 23, 24, 25, 26, 27, 30, 31, 40, 41, 43, 50, 51, 60, 61, 70, 71,77,79, 80, 90, 91, 92, 93, 94, 95, 96, 97, 98,99,100],[32,33,34,35,36,37,39,42,44,45,46,47,49,52,53,54,55,56,57,59,62,63,64,65,66,67,69,72,73,74,75,76], [1,2,12,13], [9,14,15,16,17,18,19,28,29,38], [48,58,68,78,81,82,83,84,85,86,87,88,89],[32,55,85]);
var areas = [area1,area2,area3,area4]; //array of areas, similar to how an area is an array of tiles, areas is an array of areas.
var currentArea = 0; //start at area 0.
const indiTileNames = ["unkTile","mountainTile","grassTile","waterTile","snowTile","roadTile","treasureTile"]; //classnames corresponding to tile type. MUST MATCH TILE TYPES. Possibly better stored as object pairs, but oh well.
const areaNames = ["The Ruined Gates", "The Warehouses", "The Slums","The Park"];
function loadArea(){ //load the area.
	loaded = false;

	$('.Tile').attr('class', 'Tile');
 	for(let tileType = 0; tileType<areas[currentArea].tileTypes.length;tileType++){
 		for(let indiTile = 0; indiTile<areas[currentArea].tileTypes[tileType].length;indiTile++){
 			$(getTileString(areas[currentArea].tileTypes[tileType][indiTile])).addClass(indiTileNames[tileType]);
 		}
 	}
 	if(!FOGOFWAR){//fog of war
		$('.unkTile').removeClass('unkTile');
	}	
	$('#areaNameSpan').text(areaNames[currentArea]);
 	updateLog("You have entered " + areaNames[currentArea]);
 	loaded = true;
}
function rest(){
	restCounter++;
	turn++;
	let restStatements = [" And you certainly don't think about crashing into walls."," Just peaceful, definitely not waking the dragon thoughts. "," Twiddling your thumbs, you let some time pass. "," You take the time to wonder what life as a tentacle would be like. "," You inspect the contents of your gear. \n    Treasures: " +treasure+" Score: " + score+"."];
	let updateString = "Turn "+turn +": You rest for a bit. ";
	restStatements.forEach(function(statement){
		if(Math.random()>0.75)
			updateString = updateString.concat(statement);
	});
	updateLog(updateString);
	if(dragon>0){
		dragonGlow(-0.25);
		updateLog("    Dragon suspicion: " + dragon);
	}
	 

}
function moveTile(targetTileNum, direction){ //move to destination if possible.
	let updateString = "Turn "+ ++turn +": ";
	if(checkTileCollision(areas[currentArea], targetTileNum)){ //check for collision with barrier tiles.
		turn--;
		rest();
	}
	else{//movement is possible
		moveCounter++;
		$('.activeTile').removeClass('activeTile');
		$(getTileString(targetTileNum)).addClass('activeTile'); //change player position to the active Tile.
		activeTile = targetTileNum;
		updateString+="You moved "+direction+"!";
		let checkers = [checkUp(false), checkDown(false), checkLeft(false), checkRight(false)]; //reveal surrounding tiles, remove from list of unknowns
		let foundTreasure = false;
		checkers.forEach(function(tile){//cardinals
			let checkIndex = areas[currentArea].tileTypes[0].indexOf(tile);
			if(checkIndex>-1){
				areas[currentArea].tileTypes[0].splice(checkIndex, 1);
			}
			$(getTileString(tile)).removeClass('unkTile');
			checkIndex=areas[currentArea].tileTypes[6].indexOf(tile);
			if(checkIndex>-1){
				foundTreasure = true;
			}
		});

		checkDiags().forEach(function(tile){//unveil diagonals
			let checkIndex = areas[currentArea].tileTypes[0].indexOf(tile);
			if(checkIndex>-1){
				areas[currentArea].tileTypes[0].splice(checkIndex, 1);
			}
			$(getTileString(tile)).removeClass('unkTile');
			checkIndex = areas[currentArea].tileTypes[6].indexOf(tile);
			if(checkIndex>-1){
				foundTreasure = true;
			}
		});

		$('.activeTile').mouseover(); //updates text
		updateLog(updateString);
		if(foundTreasure){
			updateLog("You see treasure in the vicinity!");
		}
		if(checkTreasure(targetTileNum)){
			$('#tileDescriptionSpan').text("Glory and riches! The dragon might be waking up soon though, maybe it's time to leave!");
			updateLog("You have found treasure!");
			updateLog("    +1000 to Score\n    +1 to Dragon Awakening likelihood");
			score+=1000;
			dragon++;
			treasure++;
			$('.activeTile').removeClass('treasureTile');
			let checkIndex = areas[currentArea].tileTypes[6].indexOf(targetTileNum);
			areas[currentArea].tileTypes[6].splice(checkIndex, 1);
		}
		if(dragon>0){
			dragonGlow(-0.05);
			updateLog("    Dragon suspicion: " + dragon);
		}
	}
}
function checkTileCollision(area, tileNum){//check if you hit a wall.
	$('#tileDescriptionSpan').text("Ow. You run into a wall of rubble. You're a thief, not a siege ram. You can't break those walls.");
	return area.tileTypes[1].indexOf(tileNum)>=0;
}
function checkTreasure(tileNum){
	return areas[currentArea].tileTypes[6].indexOf(tileNum)>=0;
}
/****The Four adjacent tiles in each direction. True is for movement check, false for just vision check. Else if describes logic for changing between areas. Both make use of a 1D array to store both rows and columns, simple math.****/
function checkUp(move){
	let tileNum = parseInt($('.activeTile').attr('data-id'),10);
	let targetTileNum = tileNum;
	if($.isNumeric(tileNum)&&tileNum>tileCols){
		targetTileNum-=tileCols;
	}
	else if(currentArea>=areaCols){//greater than the # of columns, so not in the first row.
		if(!checkTileCollision(areas[currentArea-areaCols], targetTileNum+tileRows*(tileCols-1))&&move){
			targetTileNum += tileRows*(tileCols-1);
			currentArea-=areaCols;
			loadArea();
		}
	}
	return targetTileNum;
	
}
function checkDown(move){
	let tileNum = parseInt($('.activeTile').attr('data-id'),10);
	let targetTileNum = tileNum;
	if($.isNumeric(tileNum)&&tileNum<=tileRows*(tileCols-1)){
		targetTileNum+=tileRows;
	}
	else if (currentArea<areaCols*(areaRows-1)){ //Not in the last row
		if(!checkTileCollision(areas[currentArea+areaCols], targetTileNum%tileRows)&&move){
			targetTileNum = targetTileNum%tileRows;
			if(targetTileNum==0)
				targetTileNum+=tileRows;
			currentArea+=areaCols;
			loadArea();
		}
	}
	return targetTileNum;
}
function checkLeft(move){
	let tileNum = parseInt($('.activeTile').attr('data-id'),10);
	let targetTileNum = tileNum;
	if($.isNumeric(tileNum)&&(tileNum+tileCols-1)%tileCols!=0){
		targetTileNum-=1;
	} 
	else if((currentArea+areaCols)%areaCols!=0){//not in the first column
		if(!checkTileCollision(areas[currentArea-1],targetTileNum+tileCols-1)&&move){
			targetTileNum+=(tileCols-1);
			currentArea-=1;
			loadArea();
		}
	}
	return targetTileNum;
}
function checkRight(move){
	let tileNum = parseInt($('.activeTile').attr('data-id'),10);
	let targetTileNum = tileNum;
	if($.isNumeric(tileNum)&&tileNum%tileCols!=0){
		targetTileNum ++;
	}
	else if((currentArea+1+areaCols)%areaCols!=0){//not in the rightmost column
		if(!checkTileCollision(areas[currentArea+1],targetTileNum+1-tileCols)&&move){
			targetTileNum-=(tileCols-1);
			currentArea ++;
			loadArea();
		}
	}
	return targetTileNum;
}
function checkDiags(){
	let tileNum = parseInt($('.activeTile').attr('data-id'),10);
	let diags = [];
	let leftTile = checkLeft(false);
	let rightTile = checkRight(false);
	if($.isNumeric(leftTile)&&leftTile!=tileNum&&leftTile>tileCols){ //UpLeft
		diags.push(leftTile-tileCols);
	}
	if($.isNumeric(rightTile)&&rightTile!=tileNum&&rightTile>tileCols){ //UpRight
		diags.push(rightTile-tileCols);
	}
	if($.isNumeric(leftTile)&&leftTile!=tileNum&&leftTile<=tileRows*(tileCols-1)){//DownLeft
		diags.push(leftTile+tileRows);
	}
	if($.isNumeric(rightTile)&&rightTile!=tileNum&&rightTile<=tileRows*(tileCols-1)){//DownRight
		diags.push(rightTile+tileRows);
	}
	return diags;
}
var pauseCounter = 0; //shhh
var pauseMessages = ["You brought up... the help menu!?!? Do you realize what you have done? You've broken time and hacked into the laws of the universe! Wow. That's so OP. I demand a nerf.","You've already broken the universe once, why are you doing it again? Was once not enough!?","The third time is NOT the charm! Stop it! Stop it now!","Fine. I don't care. Read! Read and move on!","...\nYou can check your score if you rest without breaking the laws of the universe.\nEventually.\nThere, was that 'helpful' enough?","You're not paying me enough to talk to you with more lines. I quit."];
function dragonGlow(change){
	dragon = parseFloat(dragon)+parseFloat(change);
	if (dragon<0){
		dragon = 0;
	}
	dragon = dragon.toFixed(2);
	let bool = false;
			if(parseFloat(dragon)<0.25)
				$("#Board").css("animation", "glow2 12.5s linear infinite");
			else if(parseFloat(dragon)<0.50)
				$("#Board").css("animation", "glow3 12.5s linear infinite");
			else if(parseFloat(dragon)<0.75)
				$("#Board").css("animation", "glow4 12.5s linear infinite");
			else if(parseFloat(dragon)<1.0)
				$("#Board").css("animation", "glow5 12.5s linear infinite");
			else
				$("#Board").css("animation", "glow5 8s linear infinite");
			
		
}
/****Input****/
$(document).keyup(function(event){
	//	alert(event.which);
	if(loaded&&!gameOver){
		switch(event.which){
			case 32:
				rest();
			break;
			case 37:
			case 65: //left
				moveTile(checkLeft(true), "west");
			break;
			case 39:
			case 68: //right
				moveTile(checkRight(true),"east");
			break;			
			case 38: 
			case 87: //up
				moveTile(checkUp(true),"north");
			break;
			case 40:
			case 83: //down
				moveTile(checkDown(true),"south");
			break;
			case 9: //tab quit
				endGame(true);
			break;
			default: //73i, instructions
				loaded = !loaded;
				if(pauseCounter<pauseMessages.length){
					$("#Board").css("animation","glow1 12.5s ease-in-out infinite");
					updateLog(pauseMessages[pauseCounter]);
				}
				else{
					updateLog("You call out for help. But there is no reply... besides the automatically generated one.");
				}
				$("#Game").hide();
				pauseCounter++;
				$("#PreGame").fadeIn();
				

			break;
			
		}

		if(turn>turnLimit)
			endGame(true);
		else if (dragon*Math.random()*100>98){
			endGame(false);
		}
	}
   });
   $(document).keypress(function(){ //loadScreen
   	if(!loaded){	
					$("#PreGame").fadeOut();
					window.setTimeout(function(){
						loadArea();//Initialize!
						$(getTileString(activeTile)).addClass('activeTile').removeClass('unkTile');
						$("#Game").fadeIn();
						$("#Board").css("animation", "glow2 12.5s linear infinite");
					},500);
				}
   }); 
   /****Descriptions?****/
$('.Tile').mouseover(function(){
	if($(this).hasClass('unkTile')){
		
		$('#tileDescriptionSpan').text("Unknown Territory: ???");
	}
	else if($(this).hasClass('mountainTile')){
		
		$('#tileDescriptionSpan').text("A chunk of rubble. You don't envy the people who used to live in here.");
	}
	else if($(this).hasClass('grassTile')){
		
		$('#tileDescriptionSpan').text("Unburnt Grass, dragonfood's food. How it survived the fire is a miracle.");
	}
	else if($(this).hasClass('waterTile')){
		
		$('#tileDescriptionSpan').text("The water is knee-deep. Aurdinas had one of the most advanced plumbing systems in the world.");
	}
	else if($(this).hasClass('snowTile')){
		$('#tileDescriptionSpan').text("The road has shattered, leaving gouged holes and piles of rocks everywhere.");

	}
	else if($(this).hasClass('roadTile')){
		$('#tileDescriptionSpan').text("Aurdinite engineering has left this piece of road intact.");
	}
	else{
		
		$('#tileDescriptionSpan').text("Stop dawdling and move!");
	}
});
function updateLog(text){
	$("#log").append("\n"+text);
	$("#log")[0].scrollTop=$("#log")[0].scrollHeight;
}
function endGame(time){
	gameOver = true;
	$('.Tile').attr("class", "");
	let deathMethod= "You have died from making too much noise and waking the dragon!";
	let endText = "******************************GAME OVER*******************************";
	if(time){
		deathMethod = "You flee the city with empty pockets, deciding not to risk the ire of the dragon or an unfriendly army.";
		
		if(treasure>1){
			endText = "**************************TREASURE LOOTED*****************************";
			$("#BoardGame").css("background-image","url(\"http://i.imgur.com/CuDJJTk.png\")");
			deathMethod = "Congratulations!! The armies of Elementia have reached Aurdinas and you were nearly caught in the crossfire. Deciding to take what you can get, you successfully make a run for it with the loot.";
		}
		$("#Board").css("animation","glow1 12.5s linear infinite;");
	}
	let pauseMethod = "But could you have done better with it?";
	let pauseScore = pauseCounter*10;
	let pauseMethod2 = "";
	if(pauseCounter>=pauseMessages.length){
		pauseMethod = "Now your disregard for the laws of the universe are no longer my problem."
		pauseMethod2= "s";
		pauseScore=pauseMessages.length*10;
	}
	else if(pauseCounter > 1){
		pauseMethod = "Nice thinking, to actually read the instructions!";
		pauseMethod2="s";
	}
	else if(pauseCounter==0){
		pauseMethod2="s"
	}
	var tilesExplored = tileRows*tileCols*areas.length;
		areas.forEach(function(area){
			tilesExplored-=area.tileTypes[0].length;
		});
	updateLog(endText+"\n"+deathMethod+"\nYou collected a total of "+treasure+" treasures.\n    Final Score: "+(score-turn-restCounter*3+pauseScore)+"\n    Movement Actions: "+moveCounter+"\n    Rests: "+restCounter+"\n    Tiles Explored: "+ tilesExplored +"\n...you asked for help "+pauseCounter+" time"+pauseMethod2+". "+pauseMethod+" Thanks for playing! Did you explore the entire map, or maximize your treasure? Did you find the secret messages? If you would like to replay the game, just refresh the tab. Can you beat your score? Be sure to brag about your high score when you vote!");
	
	$("#areaNameSpan").text("Vote for");
	$("#tileDescriptionSpan").text("The Tentacle's Grip!");
	$("#log").css("overflow","scroll");

}