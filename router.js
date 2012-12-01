
define(['jquery', 'underscore', 'backbone', 'socket', 'views/navbar', 'views/login', 'views/timeline'],
  function($, _, Backbone, socket, NavbarView, LoginView, TimelineView) {

    var Router = Backbone.Router.extend({
      initialize: function() {
        this.navbarView = new NavbarView();
        this.loginView = new LoginView();
        this.timelineView = new TimelineView();
        Backbone.history.start();
      },
      routes: {
        'login': 'login',
        'timeline': 'timeline',
        '*actions': 'default'
      },
      login: function() {
        this.navbarView.render('login');
        this.loginView.render();
      },
      timeline: function() {
        socket.emit('timelineContent', {FBId: '5625', token: '23456'});
        this.navbarView.render('timeline');
        this.timelineView.test();
      },
      default: function() {
        this.navigate('login', {trigger: true});
      }
    });

    return Router;
  });