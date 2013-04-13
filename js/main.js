var socket = io.connect('http://localhost');
socket.on('news', function(data){
	console.log(data);
	socket.emit('my other event', {my: 'data'});
});

socket.on('user_connect', function(data){
	console.log(data);
});

socket.on('message', function(data){
	console.log(data);
})