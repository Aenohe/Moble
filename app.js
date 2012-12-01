
define(['jquery', 'underscore', 'backbone', 'facebook', 'socket', 'router', 'models/user'],
  function($, _, Backbone, FB, socket, Router, User) {

    return {

      initialize: function() {
        var self = this;

        this.router = new Router();
        FB.init({ appId: '118094878340771' });

        FB.Event.subscribe('auth.statusChange', function(res) {
          if (res.status === 'connected') {
            var auth = { FBId: res.authResponse.userID, token: res.authResponse.accessToken };

            socket.emit('check_connection', auth);
            socket.emit('timelineContent', auth);
            self.router.navigate('timeline', true);
          }
          else {
            moble.user = null;
            self.router.navigate('login', true);            
          }
        });

        socket.on('basics', function(d) {
          moble.user = new User(d);
        });

        socket.on('timelineContent', function(data) {
          self.router.timelineView.setCollection(data);
        });
      }
    }
  });
