var app = require('http').createServer(handler),
	io = require('socket.io').listen(app),
	url = require('url'),
	path = require('path'),
	fs = require('fs');

app.listen(1337);

var mimeTypes = {
    "html": "text/html",
    "jpeg": "image/jpeg",
    "jpg": "image/jpeg",
    "png": "image/png",
    "js": "text/javascript",
    "css": "text/css"};

function handler(req, res){
	var uri = url.parse(req.url).pathname;
	if (uri === '/'){
		uri = '/index.html';
	}

 	var filename = path.join(process.cwd(), uri);

	fs.exists(filename, function(exists){
		if(!exists) {
			res.writeHead(500);
			return res.end('Error loading' + filename);
		}
		var mimiType = mimeTypes[path.extname(filename).split(".")[1]];
		res.writeHead(200, {'Content-Type' : mimiType});

		var fileStream = fs.createReadStream(filename);
		fileStream.pipe(res);
	})
};

io.sockets.on('connection', function(socket){
	console.log(socket);
	socket.broadcast.emit('user_connect', {hello: 'world'});

	socket.on('message', function(data){
		console.log(data);
		var url = "http://api.espn.com/v1/now/top?limit=3&apikey=fvqzfcccn6cfztsd3pcku949";
		socket.broadcast.emit('message', {data: url});
	});
});