var socket = null;

$(function(){
	socket = io.connect('http://localhost');
	socket.on('news', function(data){
		console.log(data);
		socket.emit('my other event', {my: 'data'});
	});

	socket.on('user_connect', function(data){
		console.log(data);
	});

	socket.on('message', function(data){
		if (data && data.message){
			appendMessage(data.message);
		}
	});

	$("#btnSubmit").on('click', function(){
		var input = $("#inText").val();
		sendMessage(input);
		$("#inText").val('');
		appendMessage(input);
	});

	$("#inText").keydown(function(evt){
		if (evt.which == 13){
			evt.preventDefault();
			var input = $("#inText").val();
			sendMessage(input);
			$("#inText").val('');
			appendMessage(input);
		}
	});

});

function sendMessage(message){
	socket.emit('message', { data: message });
}

function appendMessage(message){
	$("#ulChat").append('<li>'+ message + '</li>');	
}