
var moble = moble || {};
moble.user = null;
moble.server = '127.0.0.1:8080';

require.config({
  paths: {
    text: 'libs/require-text',
    socket: 'libs/socket.io',
    jquery: '//cdnjs.cloudflare.com/ajax/libs/jquery/1.8.3/jquery.min',
    underscore: '//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.4.2/underscore-min',
    backbone: '//cdnjs.cloudflare.com/ajax/libs/backbone.js/0.9.2/backbone-min',
    handlebars: '//cdnjs.cloudflare.com/ajax/libs/handlebars.js/1.0.rc.1/handlebars.min',
    bootstrap: '//cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/2.2.1/bootstrap.min',
    facebook: '//connect.facebook.net/en_US/all'
  },

  shim: {
    jquery: { exports: '$' },
    underscore: { exports: '_' },
    backbone: {
      deps: ['jquery', 'underscore'],
      exports: 'Backbone'
    },
    handlebars: { exports: 'Handlebars' },
    facebook: { exports: 'FB' }
  }
});

require(['app'], 
  function(App) {

    App.initialize();
  });
