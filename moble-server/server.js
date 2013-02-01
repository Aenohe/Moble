var conf = require('./conf');
//var io = require('socket.io').listen(conf.port);

//var route = require('./url_routes');

io.configure(function () { 
  io.set("transports", ["xhr-polling"]); 
  io.set("polling duration", 10); 
});

io.sockets.on('connection', function (socket) {});
