var express = require('express'),
    app = express.createServer(express.logger()),
    io = require('socket.io').listen(app);

app.configure(function () {
  app.use(express.static(__dirname + '/../moble-client'));
});

io.configure(function () { 
  io.set("transports", ["xhr-polling"]); 
  io.set("polling duration", 10); 
});

var route = require('./url_routes');

var port = process.env.PORT; // Use the port that Heroku provides or default to 5000
app.listen(port, function() {
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});

app.get('*', function (req, res){
  if(req.headers['x-forwarded-proto'] != 'https')
    res.redirect('https://moble.herokuapp.com' + req.url);
});

app.post('*', function (req, res){
  if(req.headers['x-forwarded-proto'] != 'https')
    res.redirect('https://moble.herokuapp.com' + req.url);
});

io.sockets.on('connection', function (socket) {
  try {
    route.check_events(socket); 
  }
  catch (err) {
    console.log(err);
  }
});
