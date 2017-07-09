var makeSprite = function(fileName, isPattern){ //make sprite
	this.image = null;
	this.pattern = null;
	this.TO_RADIANS = Math.PI/180;
	if(fileName != undefined && fileName!= "" && fileName!=null){
		this.image = new Image();
		this.image.src=fileName;
		if(isPattern){
			this.pattern = theContext.context.createPattern(this.image,'repeat');
		}
	}
	else
		console.log("ERROR:Unable to load sprite " + fileName + ".\n Please check that the filepath is correct.")
	this.draw = function(x,y,w,h){
		if(this.pattern!=null){
			theContext.context.fillStyle = this.pattern;
			theContext.context.fillRect(x,y,w,h);
		}
		else if(w ==undefined ||h==undefined){
			theContext.context.drawImage(this.image,x,y,this.image.width,this.image.height);
		}
		else{
			theContext.context.drawImage(this.image,x,y,w,h);
		}
	};
	this.rotate = function(x, y, angle){
		theContext.context.save();
		theContext.context.translate(x,y);
		theContext.context.rotate(angle*this.TO_RADIANS);
		theContext.context.drawImage(this.image, -(this.image.width/2),-(this.image.height/2));
		theContext.context.restore();
	};
}