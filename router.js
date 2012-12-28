
define(['jquery', 'underscore', 'backbone', 'views/login', 'views/timeline', 'views/edit'],
  function($, _, Backbone, LoginView, TimelineView, EditView) {

    return Backbone.Router.extend({
      routes: {
        'login': 'login',
        'timeline': 'timeline',
        'note/create': 'create',
        'note/:id/edit': 'edit',
        '*actions': 'default'
      },
      initialize: function() {
        this.loginView = new LoginView();
        this.timelineView = new TimelineView({ collection: moble.notes });

        Backbone.history.start();
      },
      login: function() {
        this.loginView.render();
      },
      timeline: function() {
        this.timelineView.render();
      },
      edit: function(id) {
        if (this.editView)
          this.editView.clean();
        this.editView = new EditView({ model: moble.notes.get(id) });
        this.editView.render();
      },
      default: function() {
        if (moble.user)
          this.navigate('timeline', true);
        else
          this.navigate('login', true);
      }
    });
  });
