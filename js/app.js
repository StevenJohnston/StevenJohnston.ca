//client

var wsChat = new WebSocket('ws://stevenjohnston.ca:8080','echo-protocol');

wsChat.addEventListener("message",function(e)
{
	if(JSON.parse(e.data).peice != null)
	{
		
	}
	else
	{
		
	}
});