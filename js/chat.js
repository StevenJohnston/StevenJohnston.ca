//client
var wsChat = new WebSocket('ws://stevenjohnston.ca:8082',['echo-protocol','someData']);
var shiftDown = false;
wsChat.addEventListener("message",function(e)
{
	data = JSON.parse(e.data);
	if(data.changeColor != null)
	{
		$(".changeColor").css("background-color",data.changeColor);
	}
	else
	{
		console.log(e);
		$(".read").append('<div class="post" style="background-color:'+data.color+'"><pre>'+data.text+'</pre></div>');
		$(".read").animate({ scrollTop: $('.read')[0].scrollHeight}, 0);
	}
});

var chatSize;
$(document).ready(function()
{
	chatSize = $(".chat").css('width');
	$(".minChat").on('click',function()
	{	
		if(chatSize > "20px")
		{
			chatSize = "20px";
		}else
		{
			chatSize = "400px";
		}
		$(".chat").css("width",chatSize);
	});
	$(".loginButton").on('click',function()
	{	
		$.cookie('username',$(".username").val());
		$.cookie('password',$(".password").val());
	});
	$(".sendMessage").on('click',function()
	{	
		sendMessage();
	});
	$(".typeInput").on('keydown',function(e)
	{
		if(e.which == 16)
			shiftDown = true;
	}).on('keyup' ,function(e)
	{
		console.log("up");
		if(e.which == 16)
			shiftDown = false;
		else if(e.which == 13)
		{
			if(!shiftDown)
			{
				sendMessage();
			}
		}
		
	});
	$(".changeColor").on('click',function(e)
	{
		wsChat.send(JSON.stringify({'changeColor':0}));
	});
});
function sendMessage()
{
	if($(".typeInput").val().trim() != "")
	{
		wsChat.send(JSON.stringify($(".typeInput").val().trim()));
	}
	$(".typeInput").val("");
}
function login()
{
	
}

