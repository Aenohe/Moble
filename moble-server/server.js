var conf = require('./conf'),
    express = require('express'),
    app = express.createServer(express.logger()),
    io = require('socket.io').listen(app);

//var route = require('./url_routes');

app.configure(function () {
  app.use(express.static(__dirname + '/../moble-client'));
});

io.configure(function () { 
  io.set("transports", ["xhr-polling"]); 
  io.set("polling duration", 10); 
});

var port = process.env.PORT || 5000; // Use the port that Heroku provides or default to 5000
app.listen(port, function() {
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
/*
app.get('/', function(req, res) {
    res.render('index.html');
});
*/
io.on('connection', function (socket) {
  console.log('Im connected !');
});
