
var moble = moble || {};

moble.config = {
  server: '127.0.0.1:8080'
};

define(['//' + moble.config.server + '/socket.io/socket.io.js'],
  function(io) {

    console.log(moble.config);

    var socket = io.connect(moble.config.server);

    socket.on('news', function(d) {
      console.log(d);
    });

    return socket;
  });