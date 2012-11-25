
define(['jquery', 'underscore', 'backbone', 'facebook', 'socket', 'router'],
  function($, _, Backbone, FB, socket, Router) {

    return {
      initialize: function() {
        var that = this;

        this.router = new Router();
        FB.init({ appId: '118094878340771' });
        this.socket = io.connect('163.5.84.193');

        FB.Event.subscribe('auth.statusChange', function(res) {
          if (res.status === 'connected')
            that.router.navigate('timeline', {trigger: true});
          else
            that.router.navigate('login', {trigger: true});
        });

        this.socket.emit('check_connection', {FBId: '5625', token: '23456'});
      }
    }
  });
