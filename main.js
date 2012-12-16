
var moble = {
  server: '127.0.0.1:8080'
};

require.config({
  paths: {
    /* plugins */
    text: '//cdnjs.cloudflare.com/ajax/libs/require-text/2.0.3/text',
    /* libraries */
    jquery: '//cdnjs.cloudflare.com/ajax/libs/jquery/1.8.3/jquery.min',
    underscore: '//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.4.2/underscore-min',
    backbone: 'libraries/backbone-0.9.9-min',  /*'//cdnjs.cloudflare.com/ajax/libs/backbone.js/0.9.2/backbone-min',*/
    handlebars: '//cdnjs.cloudflare.com/ajax/libs/handlebars.js/1.0.rc.1/handlebars.min',
    bootstrap: '//cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/2.2.1/bootstrap.min',
    facebook: '//connect.facebook.net/en_US/all',
    socketIO: '//' + moble.server + '/socket.io/socket.io',

    /* modules */
    socket: 'modules/socket'
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
  function(app) {
    app.initialize();
  });
