
define(['jquery', 'underscore', 'backbone', 'router', 'models/user', 'collections/friends', 'collections/notes',
        'facebook', 'socket'],
  function($, _, Backbone, Router, User, Friends, Notes,
        FB, socket) {

    return {
      initialize: function() {
        moble.user = null;
        moble.friends = null;
        moble.notes = new Notes();
        moble.router = new Router();

        FB.init({ appId: '118094878340771' });
        FB.Event.subscribe('auth.statusChange', function(res) {
          if (res.status == 'connected' ) {
            var auth = { FBId: res.authResponse.userID, token: res.authResponse.accessToken };

            socket.emit('check_connection', auth);
            socket.emit('timelineContent', auth);
            moble.router.navigate('timeline', true);
          }
          else {
            moble.user = null;
            moble.router.navigate('login', true);
          }
        });

        socket.on('basics', function(d) {
          moble.user = new User(d);
        });
        socket.on('timelineContent', function(d) {
          moble.notes.update(d);
        });
        socket.on('createNote', function(d) {
          moble.notes.add(d);
        });
      }
    }
  });
