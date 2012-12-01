
define(['//' + moble.server + '/socket.io/socket.io.js'],
  function(io) {

    var socket = io.connect(moble.server);

    return socket;
  });
