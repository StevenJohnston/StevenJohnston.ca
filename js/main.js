//var rows;
//var columns;
//var tileWidth;
//var tileHeight;
//var screenWidth;
//var screenHeight;
var homeTiles;
var takenTiles;
var tileHover;
var tileMove;
var mouseOffSet;
var distMove;
var tilePos;
var rows;
var columns;

$(document).ready(function()
{
	homeTiles = $("div").toArray();
	mobileLook();
	moveFrontTiles();
	$(".moveSquare").mousedown(function(event){
		if($.inArray(this,homeTiles)!= -1)
		{
			tilePos  = {'X': Math.floor(event.clientX / tileWidth) , 'Y': Math.floor(event.clientY/tileHeight)};
			distMove = 0;
			mouseOffSet = {'X':event.clientX - ($(this).css("left")).substring(0,($(this).css("left")).length-2),
							'Y':event.clientY - ($(this).css("top")).substring(0,($(this).css("top")).length-2)};
			
			tileMove = this;
		}
	});
	$(".moveSquare").mouseup(function(event){
		$(tileMove).css("left",tileWidth*Math.floor(event.clientX/tileWidth));
		$(tileMove).css("top",tileHeight*Math.floor(event.clientY/tileHeight));
		tileMove = null;
	});
	$(".moveSquare").click(function(event){
		if(distMove<100)
		{
			var buttonName = $(this).attr('name'); 
			if(buttonName && (buttonName).substring(0,4) =="http")
			{
				if(Math.floor(event.clientX/tileWidth) == tilePos['X'] && Math.floor(event.clientY/tileHeight) == tilePos['Y'])
				{
					window.open($(this).attr('name'),'_self');
				}
			}
			else if( buttonName == "projecteuler")
			{
				var data = getData("ProjectEuler");
				//console.log(data[0]['id']);
			}
			else if(buttonName == "myresume")
			{
				console.log("click");
				throwAway("dog");
			}
		}
	});
	
	
	function throwAway(gotoUrl)
	{
		var closeIt = 0;
		var minimize = 0.1;
		setInterval(function() {
			$(".moveSquare").each(function(){
				$(this).css("top",(parseInt($(this).css("top")) - window.innerHeight / 100 + "px"));
				$(this).css("left",(parseInt($(this).css("left")) - window.innerWidth / 100 + "px"));
			});
			//minimize+= 0.0001;
			closeIt++;
			if(closeIt == 100)
				console.log("loops");
		}, 1);
		
	}
});

$(window).mousemove(function(event)
{
	if(tileMove)
	{
		distMove++;
		$(tileMove).css("left",event.clientX - mouseOffSet['X']);
		$(tileMove).css("top",(event.clientY - mouseOffSet['Y']))+"px";
	}
});
function moveFrontTiles()
{
	
	takenTiles = new Array();
	$.each( homeTiles,function(key,value)
	{
		var rnd;
		var justBreak =0;
		while(true)
		{
		justBreak++;
			var pass = true;
			rnd = Math.floor(Math.random()*rows*columns);
			$.each(takenTiles,function(tempkey,tempValue)
			{
				if(tempValue == rnd)
				{
					pass= false;
				}
			});
			if(pass==true || justBreak > 100)
			{
				takenTiles.push(rnd);
				
				break;
			}
		}
		$("#"+value.id).css("left", (rnd % columns * tileWidth)+"px");
		$("#"+value.id).css("top", (Math.floor(rnd / columns) * tileHeight)+"px");
	});
}
function getData(databaseName)
{
	var returnIt;
	$.ajax({
	url: "../php/getall.php",
	type: "GET",
	async: false,
	data: {"database":databaseName},
	dataType: 'json',
	success: function(database){
		returnIt = database;
	},
	error: function (xhr, ajaxOptions, thrownError) {
		alert(xhr.status);
		alert(thrownError);
	} 
	}); 
	return returnIt;
}
$(window).resize(function()
{
	//makeHomeTiles();
	
});
