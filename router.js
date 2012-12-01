
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
        'note/create': 'createNote',
        'note/:id/remove': 'removeNote',
        '*actions': 'default'
      },
      login: function() {
        this.navbarView.render('login');
        this.loginView.render();
      },
      timeline: function() {
        this.navbarView.render('timeline');
        this.timelineView.render();
      },
      createNote: function() {
        if (moble.user)
          socket.emit('createNote', moble.user.toJSON());
        this.navigate('timeline', true);
      },
      removeNote: function(_id) {
        if (moble.user)
          socket.emit('removeNote', $.extend(moble.user.toJSON(), {note_id: _id}));
        this.navigate('timeline', true);
      },
      default: function() {
        this.navigate('login', true);
      }
    });

    return Router;
  });