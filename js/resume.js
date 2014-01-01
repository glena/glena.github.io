d3.selection.prototype.moveToFront = function() {
	return this.each(function(){
		this.parentNode.appendChild(this);
	});
};
function getPathCommandsTop(diameter)
{
	var radius = diameter/2;
	return "M"+diameter+","+radius+" h0 a"+radius+","+radius+" 0 0,0 -"+diameter+",0 z";
}
function getPathCommandsBottom(diameter)
{
	var radius = diameter/2;
	return "M0,0 h0 a"+radius+","+radius+" 0 0,0 "+diameter+",0 z";
}
function getPathCommandsQuadratic(diameter, position)
{
	var radius = diameter/2;
	var height = position * (100 + radius * 0.7);
	return "M0,0 q "+radius+" "+height+" "+diameter+" 0 z";
}
var lastFill = null;
function getFill() {
	var fill;
	do{
		var colors = [
			'#ff0000',
			'#3577c4',
			'#ffaa00',
			'#ffff00',
			'#74c425', 
			'#940bdd', 
			'#00f6ff', 
			'#ff00c3', 
			'#8e6d2c', 
			'#ffffff', 
			'#b2ff00'
		];
		var index = Math.floor((Math.random()*(colors.length-1))+1);
		fill = colors[index];
	} while (fill == lastFill);
	lastFill = fill;
	return fill;
}
function normalize(data)
{
	var a = 0;
	data.forEach(function(d) {
		d.id = a++;
		d.from = parseDate(d.from);
		if (d.to == null)
		{
			d.pto = new Date();
		}
		else
		{
			d.to = parseDate(d.to);
			d.pto = d.to;
		}
	});
}
function calculateDiameter(data)
{
	data.forEach(function(d) {
		d.diameter = x(d.pto)-x(d.from);
	});
	data.sort(function(a,b){
		return b.diameter - a.diameter;
	});
}

function loadItems(svg, graphContainer, data, className, position, infoTopPosition)
{

	var gInfo = svg
		.selectAll("g.info."+className)
		.data(data)
		.enter()
			.append('g')
			.attr('class',function(d){ return className + d.id })
			.classed('info',true)
			.classed(className,true)
			.attr("transform", "translate(50,"+infoTopPosition+")")
			.attr("fill-opacity", 0);

	gInfo.append('text')
				.style("fill", "white")
				.classed('institution',true)
				.attr("font-size","18px")
				.text(function(d){return d.type;})
				.attr("transform", "translate(0,0)");

	gInfo.append('text')
				.style("fill", "white")
				.classed('institution',true)
				.style("font-weight", "bold")
				.attr("font-size","18px")
				.text(function(d){return d.institution;})
				.attr("transform", "translate(0,25)");

	gInfo.append('text')
				.style("fill", "white")
				.style("font-weight", "bold")
				.classed('title',true)
				.attr("font-size","23px")
				.text(function(d){return d.title;})
				.attr("transform", "translate(0,50)");

	gInfo.append('text')
				.style("fill", "white")
				.classed('dates',true)
				.style("font-weight", "bold")
				.attr("font-size","14px")
				.text(function(d){
					var text = formatToShow(d.from) + ' - ';
					if (d.to == null)
						text += 'Now';
					else
						text += formatToShow(d.to);
					return text;
				})
				.attr("transform", "translate(0,70)");

	gInfo.selectAll('text.description')
			.data(function(d, i) { 
				var position = 70; 
				return d.description.split("\n").map(function(i){
					position += 20;
					return {
						text:i,
						position:position
					};
				}); 
			})
			.enter()
				.append('text')
				.attr("width", size.width / 2)
				.style("fill", "white")
				.attr("font-size","14px")
				.classed('description',true)
				.text(function(d){return d.text;})
				.attr("transform", function(d) {
					return "translate(0,"+d.position+")";
				});


	graphContainer
		.selectAll("path."+className)
		.data(data)
		.enter()
			.append("path")
			.classed(className,true)
			.classed('item',true)
	        .attr("fill", getFill)
	        .attr("fill-opacity", 0.5)
	        .attr("stroke", "#FFFFFF")
	        .attr("stroke-width", "2")	
	        .attr("d",function(d){ return getPathCommandsQuadratic(d.diameter, position); })
	        .attr("transform", function(d) {
				return "translate(" + [x(d.from),  0] + ")";
			})
			.on('mouseover', function(d){
				graphContainer
					.selectAll("path.item")
					.transition()
						.attr("stroke-width", "1")	
	                	.attr("fill-opacity", 0);
				d3
					.select(this)
					.transition()
						.attr("stroke-width", "2")	
	                	.attr("fill-opacity", 1);

                showInfo(svg, className, d);
            })
          	.on('mouseout', function(d){
              	graphContainer
					.selectAll("path.item")
					.transition()
					.attr("stroke-width", "2")
                	.attr("fill-opacity", 0.5);

                lastTimeout = setTimeout(hideInfo,3000);     
            });


}
var lastTimeout = null;
function hideInfo()
{
	svg
		.selectAll("g.info")
		.transition()
	    	.attr("fill-opacity", 0); 
}
function showInfo(svg, className, d)
{
	if (lastTimeout) 
	{
		clearTimeout(lastTimeout);
		lastTimeout = null;
	}

	hideInfo();

    svg
		.selectAll("g.info."+className+"."+className+d.id)
		.transition()
	    	.attr("fill-opacity", 1); 
}

var size = {
  width: Math.floor($(document).width() * 0.95),
  height: Math.floor($(document).height() * 0.9),
  svgwidth: Math.floor($(document).width() * 0.95),
  svgheight: Math.floor($(document).height() * 0.9),
  margin:20
};

if (size.width < 900) size.width = 900;
if (size.height < 600) {
	size.height = 600;
	size.svgheight = 600;
}

$(".resume").css('width', size.svgwidth + 'px');

var formatToShow = d3.time.format("%m/%d/%Y");
var format = d3.time.format("%Y-%m-%d");
var parseDate = format.parse;

var svg = d3
		.select("article.resume")
		.append('svg')
      		.attr("width", size.svgwidth)
      		.attr("height", size.svgheight)
      		.on('scroll', function(){
      			console.log('scroll');
      		});

var topSemicircle = d3.select("#top");

/* scales */      
var x = d3.time.scale().range([+size.margin, size.width-size.margin]);
var y = d3.scale.linear().range([size.height, 0]);
y.domain([0, size.height]);

var xAxis = d3.svg.axis()
	.scale(x)
	.orient("bottom")
	.ticks(30)
	.tickFormat(d3.time.format("%Y-%m"));

d3.json('/data/resume.json',function(error, data){

	normalize(data.experience);
	normalize(data.study);

	x.domain([
			d3.min([
				d3.min(data.experience, function(d) { return d.from; }),
				d3.min(data.study, function(d) { return d.from; })
				])
			,
			d3.max([
				d3.max(data.experience, function(d) { return d.pto; }),
				d3.max(data.study, function(d) { return d.pto; })
				])
		]);

	calculateDiameter(data.experience);
	calculateDiameter(data.study);

	var graphContainer = svg
		.append("g")
		.attr("class", "graph-container")
		.attr("transform", "translate(" + [0,size.height - 200] + ")");;
	
	var xAxilsEl = graphContainer.append("g")
			.attr("class", "x axis")
			.attr("transform", "translate(0," + 0 + ")")
			.call(xAxis);

	xAxilsEl.selectAll("path")
			.attr("fill", "none")
			.attr("fill-opacity","1")
			.attr("stroke","#FFFFFF")
			.attr("stroke-width","1px");
	
	xAxilsEl.selectAll("text")
			.style("text-anchor", "end")
			.style("fill", "white")
			.attr("transform", "rotate(-60)");

	graphContainer.append('text')
			.style("fill", "white")
			.classed('label',true)
			.attr("font-size","18px")
			.text('WORKS')
			.style("text-anchor", "center")
			.attr("transform", "translate("+[15,- 25]+") rotate(-90)");

	graphContainer.append('text')
			.style("fill", "white")
			.classed('label',true)
			.attr("font-size","18px")
			.text('STUDIES')
			.style("text-anchor", "center")
			.attr("transform", "translate("+[15,100]+") rotate(-90)");

	loadItems(svg, graphContainer, data.experience, "experience", -1, size.height / 8);
	loadItems(svg, graphContainer, data.study, "study", 1, size.height / 8);

	$( "svg" ).on( "touchstart", swipeStartHandler );
	$( "svg" ).on( "touchmove", swipeHandler );
	$( "svg" ).on( "touchend", swipeEndHandler );

});

var touchStart = null;
var graphPosition = 0;
function swipeStartHandler( event ){
	touchStart = event.originalEvent.touches[0].clientX;
}
function swipeEndHandler( event ){
	
}
function swipeHandler( event ){
	if (touchStart == null) return;

	touchMove = event.originalEvent.touches[0].clientX;
	var delta = touchMove - touchStart;
	
	graphPosition = graphPosition + delta;

	if (graphPosition > 0)
	{
		graphPosition = 0;
	}
	if (graphPosition < -1 * (size.width - size.svgwidth))
	{
		graphPosition = -1 * (size.width - size.svgwidth);
	}

	d3.select("g.graph-container").attr("transform", "translate(" + [graphPosition,size.height - 200] + ")");

	touchStart = touchMove;
}


