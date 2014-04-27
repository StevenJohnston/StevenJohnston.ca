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
var questionsPerTile;
var numberTiles;
var questionInfo = {items:[]};

$(document).ready(function()
{
	questionsPerTile = numberOfQuestions;
	mobileLook();
	moveFrontTiles();
	$("body").append('<div id = "info" class="info" style ="width:'+(tileWidth*3)+'; height:'+(tileHeight)+';z-index:2;"><h5 class = "infop"><a href="http://projecteuler.net/progress=StevenDavidJohnston" target="_blank">Project Euler</a> exists to encourage, challenge, and develop the skills and enjoyment of anyone with an interest in the fascinating world of mathematics. </h5></div>');
	$("body").append('<div id = "question" class = "question"></div>');
	//$("#question").append('<div id = "back" class = "returnSquare "></div>');
	$("#question").append('<div id = "questionNumber" class = "questionNumber "><p class="questionDivText"></p></div>');
	$("#question").append('<div id = "questionText" class = "questionText expand questionTiles"><p class="questionDivText"></p></div>');
	$("#question").append('<div id = "questionSolution" class = "questionTiles questionSolution expand"><pre class="questionDivText" style="padding-top:0px"></pre></div>');
	$("#question").append('<div id = "questionTest" class = "questionTest expand"><p class="questionDivText"></p></div>');
	$("#question").hide();
	
	for(i =0 ; i < problemNumbers.length; i++)
	{
		$("body").append('<div id = "' + problemNumbers[i] + '" class = "numberSquare sizeSquare" style = "left:'+((i+3)%columns)*tileWidth+'; top:'+Math.floor((i+3)/columns)*tileHeight+'; width:'+(tileWidth-1)+'px; height:'+(tileHeight-1)+'px;z-index:2"><p class="bottomRight">#'+problemNumbers[i]+'</p></div>');
	}
	$(".numberSquare").click(function()
	{
		var numberClicked = this.id;
		if(questionInfo.items[numberClicked] == null)
		{
			questionInfo.items[numberClicked] = (getData(this.id));
		}
		showQuestion();
		setQuestion(numberClicked,questionInfo.items[numberClicked].question,questionInfo.items[numberClicked].javascript,questionInfo.items[numberClicked].form);
		
	});
	$(".returnSquare").click(function()
	{
		$(".question").hide();
	});
	
	
	$( ".question" ).on("mousedown","input:submit",function() {
		$("input:submit").data("clicked",true);
	}).on("click","input:submit",function(){
		$("input:submit").data("clicked",false);
	});
	
	
	/*$(".expand").click(function(event)
	{
		if(!$("input:submit").data('clicked'))
		{
			var tempId = "#"+$(this).attr("id") + " .questionDivText";
			if( parseInt($(tempId).css("height"))+50 > parseInt($(this).css("height")))
			{
				$(this).css("height", parseInt($(tempId).css("height")) + 50);
			}
			else
			{
				$(this).css("height","30%");
			}
		}
	});*/
	$( "body" ).on("click",".backSquare",function() {
		$(".question").hide();
		
	});
	$( "body" ).on("click",".logo",function() {
		$(".question").hide();
	});
	
	$(".returnSquare").css({"width":tileWidth,"height":"10%"});
	$(".questionNumber").css({"height":"10%"});
	
});

$(window).mousemove(function(event)
{
	if(tileMove)
	{
		distMove++;
		$(tileMove).css("left",event.clientX - mouseOffSet['X']);
		$(tileMove).css("top",event.clientY - mouseOffSet['Y']);
	}
});
function moveFrontTiles()
{
	var i=0;
	$.each($(".numberSquare"),function(key,value)
	{
		$(this).css("left",(i+3)%columns*tileWidth);
		$(this).css("top",Math.floor((i+3)/columns)*tileHeight);
		i++;
	});
	$(".info").css("width",tileWidth*3);
	$(".info").css("height",tileHeight);
}
function getData(questionNumberClicked)
{
	var returnIt;
	$.ajax({
	url: "../php/questionInfo.php",
	type: "GET",
	async: false,
	data: {"questionNumber":questionNumberClicked},
	dataType: 'json',
	success: function(database){
		returnIt = database;
		console.log(database);
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
	moveFrontTiles();
	if($(".question").is(":visible"))
		showQuestion();
});
function showQuestion()
{
	//$(".question").css("height",tileHeight *5);
	//$(".question").css("width",tileWidth *3);
	//$(".returnSquare").css("height",tileHeight-1);
	//$(".questionNumber").css("height",tileHeight-1);
	//$(".questionText").css("height",tileHeight-1);
	//$(".questionSolution").css("height",tileHeight-1);
	//$(".questionTest").css("height",tileHeight-1);
	$(".question").show();
	
}
function setQuestion(number,questionText,code,form)
{
	//$(".question").css("background-color", $("#" + number).css("background-color"));
	$(".questionNumber .questionDivText").text("Project Euler Question #" + number);
	$(".questionText .questionDivText").html("Q: <a href='http://projecteuler.net/problem="+number+"' target='_blank'>View Question Page</a> <br/>" + (questionText.split("!@").join("<br/> ")).split("!#").join(" "));
	//$(".questionSolution .questionDivText").html("A: </br>"+code.split("!@").join("<br />"));
	$(".questionSolution .questionDivText").html("A: </br>"+ colorCode(code)+ "<br/>");
	$(".questionTest .questionDivText").html("Test It Yourself:<br/>" + form);
	//$("head").append('<script>'+formScript+'</script>');
	$("head").append('<script>'+code.split('!@').join('').split('!#').join('').replace(/<(?:.|\n)*?>/gm, '')+'</script>');
}
$(window).resize(function()
{
	//Math.floor(xHeight = $(".question").css("height").split("px")[0]*0.1);
	//$(".returnSquare").css({"width":xHeight+"px","height":"10%"});
});

