
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
    });

    socket.on('createNote', function(d) {
      moble.notes.add(d);
      moble.router.navigate('edit/' + d._id, true);
    });

    return socket;
  });
