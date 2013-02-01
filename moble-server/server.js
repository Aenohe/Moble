var conf = require('./conf');
var io = require('socket.io').listen(conf.port);

//var route = require('./url_routes');

io.sockets.on('connection', function (socket) {
 	try
 	{
    console.log('toto');
 		//route.check_events(socket);	
 	}
 	catch (err)
 	{
 		console.log(err);
 	}
});
