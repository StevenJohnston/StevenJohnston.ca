var rows;
var columns;
var tileWidth;
var tileHeight;
var tileHover;
var isMobile;

$(document).ready(function(){
	$("body").append('<div id = "logo" class = "logo"></div>');
	mobileLook();
	makeTiles();
	
	$( "body" ).on("mouseenter",".backSquare",function(event) {
		$(this).css("opacity",0.5);
		tileHover = this.id;
	});
	
	$( ".moveSquare" ).mouseenter(function(event) {
		tileHover = null;
	});
	
});
window.setInterval(function() {
	for(i = 0; i < rows*columns;i++)
	{
		var opacitys = Number($("#bg"+i).css("opacity"));
		if(opacitys != 1&& i != tileHover)
		{
			$("#bg"+i).css("opacity", opacitys+=0.05);
		}
	}
},50);
function makeTiles()
{
	for(i = 0 ; i < rows*columns;i++)
	{
		if($("#bg"+i).length)
		{
			$("#bg"+i).css("left",((i%columns)*tileWidth)+"px");
			$("#bg"+i).css("top", (Math.floor(i/columns)*tileHeight)+"px");
		}
		else
		{
			$("body").append('<div id = "bg' + i + '" class = "backSquare sizeSquare" style = "left:'+(i%columns)*tileWidth+'px; top:'+Math.floor(i/columns)*tileHeight+'px; width:'+(tileWidth-1)+'px; height:'+(tileHeight-1)+'px;"></div>');
		}
	}
	while(true)
	{
		if($("#bg"+i).length)
		{
			$("#bg"+i).css("left","-500px");
			$("#bg"+i).css("top", "-500px");
			i++;
		}
		else
		{
			break;
		}
	}
}
function mobileLook()
{
	if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || $(window).innerHeight()>$(window).innerWidth() ) {
		if($(window).innerHeight() > $(window).innerWidth())
		{
			columns =5;
			$(".logo").css("width","100%");
			$(".logo").css("left","0%");
			$(".logo").css("height",parseInt($(".logo").css("width"))*0.57);
			$(".logo").css("top",(window.innerHeight/2 - parseInt($(".logo").css("height"))/2)+"px");
		}
		else
		{
			columns = Math.round(window.innerWidth / (($(window).innerHeight() /3)));
			$(".logo").css("height","100%");
			$(".logo").css("top","0%");
			$(".logo").css("width",(parseInt($(".logo").css("height"))/0.57)+"px");
			$(".logo").css("left",(window.innerWidth/2 - parseInt($(".logo").css("width"))/2)+"px");
		}
		$("p").css("font-size",14);
	}else{
		$(".logo").css("width","20%");
		$(".logo").css("left","40%");
		$(".logo").css("height",(parseInt($(".logo").css("width"),10)*0.57)+"px");
		$(".logo").css("top",(window.innerHeight/2 - parseInt($(".logo").css("height"))/2)+"px");
		$("p").css("font-size",14);
		columns =15;
	}
	tileWidth = window.innerWidth/columns;
	rows = Math.round(window.innerHeight / tileWidth);
	tileHeight = (window.innerHeight-1)/ rows;
	
	$(".sizeSquare").css("width", (tileWidth-1)+"px");
	$(".sizeSquare").css("height", (tileHeight-1)+"px");
}
$(window).resize(function()
{
	mobileLook();
	makeTiles();
	moveFrontTiles();
});
