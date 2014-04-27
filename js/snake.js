//client
var ws = new WebSocket('ws://stevenjohnston.ca:8081','echo-protocol');
var snake =[];
var clients = {};
var head;
var direction;
var timer=0;
var peice =0;
ws.addEventListener("message",function(e)
{
	if(JSON.parse(e.data).peice != null)
	{
		$("#" + peice).css("background-color","#555555");
		peice = JSON.parse(e.data).peice;
		$("#" + peice).css("background-color","white");
	}
	else if(JSON.parse(e.data).color != null)
	{
		$(".title").css("color",JSON.parse(e.data).color);
	}
	else
	{
		clearSnake();
		clients = JSON.parse(e.data);
		buildSnake();
	}
});
$(document).ready(function()
{
	for(i = 0 ; i < 80*80 ; i ++)
	{
		$(".game").append('<div id = "' + i + '" class = "tiles" ></div>');
	}
	$('.gameOuter').focus();
	$(".gameOuter").bind("keypress",function(e)
	{
		//console.log(e.which);
		if(e.which == 119)
		{
			//W
			var someJson = {number: 1 }
			ws.send(JSON.stringify(someJson));
		}
		else if(e.which == 100)
		{
			//D
			var someJson = {number: 2}
			ws.send(JSON.stringify(someJson));
			
		}
		else if(e.which == 115)
		{
			//S
			var someJson = {number: 3}
			ws.send(JSON.stringify(someJson));
		}
		else if(e.which == 97)
		{
			//A
			var someJson = {number: 4}
			ws.send(JSON.stringify(someJson));
		}else if(e.which == 32)
		{
			var someJson = {number: 5}
			ws.send(JSON.stringify(someJson));
		}
	});
	
});

function clearSnake()
{
	for(var cIndex = 0 ; cIndex < Object.keys(clients).length ; cIndex++)
	{
		for(var i = 0 ; i < clients[Object.keys(clients)[cIndex]].snake.length ; i++)
		{
			$("#" + clients[Object.keys(clients)[cIndex]].snake[i]).css("background-color","#555555");
		}
	}
}
function buildSnake()
{
	for(var cIndex = 0 ; cIndex < Object.keys(clients).length ; cIndex++)
	{
		for(var i = 0 ; i < clients[Object.keys(clients)[cIndex]].snake.length ; i++)
		{
			$("#" + clients[Object.keys(clients)[cIndex]].snake[i]).css("background-color",clients[Object.keys(clients)[cIndex]].color);
		}
	}
	$("#"+ peice).css("background-color","white");
}