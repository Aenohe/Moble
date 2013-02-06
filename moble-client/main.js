
/* moble defines */
var moble = {
  /* data */
  user: null,
  mobleFriends: null,
  otherFriends: null,
  notes: null,
  /* server config */
  server: {
    address: 'arcane-castle-2641.herokuapp.com',
    port: '80'
  },
  /* facebook */
  facebook: {
    appId: '118094878340771'
  }
};

/* requirejs config */
require.config({
  paths: {
    /* plugins */
    text: '//cdnjs.cloudflare.com/ajax/libs/require-text/2.0.3/text',
    /* libraries */
    jquery: '//cdnjs.cloudflare.com/ajax/libs/jquery/1.8.3/jquery.min',
    underscore: '//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.4.2/underscore-min',
    backbone: '//cdnjs.cloudflare.com/ajax/libs/backbone.js/0.9.9/backbone-min',
    bootstrap: '//cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/2.2.1/bootstrap.min',
    // need to do it here, seems not working if directly passed into define
    socketLib: '//' + moble.server.address + ':' + moble.server.port + '/socket.io/socket.io',
    facebookSDK: '//connect.facebook.net/en_US/all',
    handlebarsLib: '//cdnjs.cloudflare.com/ajax/libs/handlebars.js/1.0.rc.1/handlebars.min',
    /* helpers */
    socket: 'helpers/socket',
    facebook: 'helpers/facebook',
    handlebars: 'helpers/handlebars'
  },

  shim: {
    jquery: { exports: '$' },
    underscore: { exports: '_' },
    backbone: {
      deps: ['jquery', 'underscore'],
      exports: 'Backbone'
    },
    handlebarsLib: { exports: 'Handlebars' },
    facebookSDK: { exports: 'FB' },
    socketLib: { exports: 'io' }
  }
});

require(['app', 'facebook'],
  function(app, FB) {

    app.initialize();
    FB.initialize();
  });
