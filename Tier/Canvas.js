var theContext = { //canvas context
	canvas:null,
	context:null,
	create: function(canvasId){
		this.canvas = document.getElementById(canvasId);
		this.context= this.canvas.getContext('2d');
		return this.context
	}
};
