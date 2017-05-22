/*D3 Javacript for clock example*/
function fields(){
	var now = new Date();

	return data = [{"unit":"seconds","numeric":now.getSeconds()},{"unit":"minutes","numeric":now.getMinutes()+now.getSeconds()/60},{"unit":"hours","numeric":now.getHours()+now.getMinutes()/60}]
	}

var width, height, offsetX, offsetY, scaleSecs, scaleHours;
var pi = Math.PI;
width = 400;
height = 200;
offsetX = 150;
offsetY = 100;
scaleSecsMins = d3.scaleLinear().domain([0, 59 + 59 / 60]).range([0, 2 * pi]);
scaleHours = d3.scaleLinear().domain([0,11+59/60]).range([0,2*pi]);

var vis, clockGroup, label;
vis = d3.select("body").append("svg:svg").attr("width",width).attr("height",height);
clockGroup = vis.append("svg:g").attr("transform","translate("+offsetX+","+offsetY+")");
clockGroup.append("svg:circle").attr("r",80).attr("fill","none").attr("class","clock outercircle").attr("stroke","black").attr("stroke-width",2);
clockGroup.append("svg:circle").attr("r",4).attr("fill","black").attr("class","clock innercircle");

clockGroup.selectAll(".hour-tick").data(d3.range(0,13)).enter().append('line').attr('class','hour-tick').attr('x1',0).attr('x2',0).attr('y1',80).attr('y2',60).attr("stroke","black").attr("stroke-width",1).attr('transform',function(d){return 'rotate('+scaleHours(d)*180/pi+ ')';});

clockGroup.selectAll(".sec-tick").data(d3.range(0,60)).enter().append('line').attr('class','sec-tick').attr('x1',0).attr('x2',0).attr('y1',80).attr('y2',75).attr("stroke","black").attr("stroke-width",1).attr('transform',function(d){return 'rotate('+scaleSecsMins(d)*180/pi+ ')';});
clockGroup.selectAll(".hour-label").data(d3.range(0,13)).enter().append('text')
.attr('class','hour-label')
.attr('text-anchor','middle')
.attr('x',function(d){return 40*Math.sin(scaleHours(d)*2*pi);})
.attr('y',function(d){return -40*Math.cos(scaleHours(d)*2*pi)+9;})
.attr("font-family","serif")
.attr("font-size","24px").attr("dy", ".35em")
.attr('text',function(d){return d;});
var render = function(data){
	var hourArc, minuteArc, secondArc;
	clockGroup.selectAll(".clockhand").remove();
	secondArc = d3.arc().innerRadius(0).outerRadius(70).startAngle(function(d){return scaleSecsMins(d.numeric);}).endAngle(function(d){return scaleSecsMins(d.numeric);});
	minuteArc = d3.arc().innerRadius(0).outerRadius(70).startAngle(function(d){return scaleSecsMins(d.numeric);}).endAngle(function(d){return scaleSecsMins(d.numeric);});
	hourArc = d3.arc().innerRadius(0).outerRadius(70).startAngle(function(d){return scaleHours(d.numeric%12);}).endAngle(function(d){return scaleHours(d.numeric%12);});
	
	clockGroup.selectAll(".clockhand").data(data).enter().append("svg:path").attr("d",function(d){
		if(d.unit==="seconds"){
			return secondArc(d);
		}else if (d.unit==="minutes"){
			return minuteArc(d);
		}else if (d.unit==="hours"){
			return hourArc(d);
		}
	}).attr("class","clockhand").attr("stroke","black").attr("stroke-width",function(d){
		//alert(d.numeric);
		if(d.unit==="seconds"){
			return 2;
		}else if (d.unit==="minutes"){
			return 3;
		}else if (d.unit==="hours"){
			return 3;
		}
	}).attr("fill","none");

}
setInterval(function(){
	console.log("rendering");
	return render(fields());
	
},1000);