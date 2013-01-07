
define(['//' + moble.server.address + ':' + moble.server.port + '/socket.io/socket.io.js'],
  function(io) {

    var socket = io.connect(moble.server.address + ':' + moble.server.port);

    socket.on('check_connection', function(d) {
      moble.user.set(d.user);
      moble.mobleFriends.update(d.mobleFriends);
      moble.otherFriends.update(d.otherFriends);
      moble.trigger('user:connected');
    });

    socket.on('timelineContent', function(d) {
      moble.notes.update(d);
      console.log(moble.notes);
      console.log(moble.notes.selected());
    });

    socket.on('createNote', function(d) {
      moble.notes.add(d);
    });

    return socket;
  });
