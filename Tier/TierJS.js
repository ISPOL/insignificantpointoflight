
$(document).ready(function(){
	theContext.create('canvas');
	theContext.context.beginPath();

	const TREASURE = "Sprites/Treasure.png"
	let image = new makeSprite(TREASURE,false);
	let pattern = new makeSprite(TREASURE,true);
	let angle =0;
	setInterval(function(){
		theContext.context.fillStyle="#000000";
		theContext.context.fillRect(0,0,640,480);
		image.draw(10,10,50,50);
		image.draw(10,70,25,240);
		pattern.draw(100,60,250,150);
		image.rotate(115,460,angle+=4.0)

	},25)
});