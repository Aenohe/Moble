
define(['socket', 'jquery', 'underscore', 'backbone', 'router', 'models/user.js', 'collections/friends', 'collections/notes'],
  function(socket, $, _, Backbone, Router, User, Friends, Notes) {

    return {
      initialize: function() {
        moble = _.extend(moble, Backbone.Events);
        moble.user = new User();
        moble.mobleFriends = new Friends();
        moble.otherFriends = new Friends();
        moble.notes = new Notes();
        moble.router = new Router();

        moble.on('user:check_connection', function(auth) {
          socket.emit('check_connection', auth);
        });

        moble.on('user:connected', function() {
          socket.emit('timelineContent', moble.user.toJSON());
          moble.router.navigate('timeline', true);
        });

        moble.on('user:disconnect', function() {
          moble.router.navigate('login', true);
        });

        Backbone.history.start();
        moble.router.navigate('login', true);
      }
    };
  });
