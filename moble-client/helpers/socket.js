
define(['socketLib'],
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

    socket.on('onFriendsUpdated', function(d) {
      moble.mobleFriends.update(d.mobleFriends);
      moble.otherFriends.update(d.otherFriends);
    });

    socket.on('onNoteUpdated', function(d) {
      moble.notes.get(d._id).set(d);
      moble.trigger('noteUpdated', d);
    });

    socket.on('onNoteShared', function(d) {
      moble.notes.add(d);
      moble.trigger('noteShared', d);
    });

    socket.on('onNoteRemoved', function(d) {
      moble.notes.remove(moble.notes.get(d._id));
      moble.trigger('noteRemoved', d);
    });

    socket.on('onFriendConnected', function(d) {
      moble.trigger('friend:connected', d);
    });

    socket.on('news', function(d) {
      console.log('news: ' + d);
    });

    return socket;
  });
