
define(['jquery', 'underscore', 'backbone', 'views/login', 'views/timeline', 'views/edit', 'views/share'],
  function($, _, Backbone, LoginView, TimelineView, EditView, ShareView) {

    return Backbone.Router.extend({
      routes: {
        'login': 'toLogin',
        'timeline': 'toTimeline',
        'edit/:id': 'toEdit',
        'share': 'toShare',
        "*actions": 'default'
      },
      initialize: function() {
        this.loginView = new LoginView();
        this.timelineView = new TimelineView({ notes: moble.notes });
        this.editView = new EditView();
        this.shareView = new ShareView({ notes: moble.notes, mobleFriends: moble.mobleFriends, otherFriends: moble.otherFriends });
      },
      toLogin: function() {
        this.loginView.render();
      },
      toTimeline: function() {
        this.timelineView.render();
      },
      toEdit: function(id) {
        this.editView.render(moble.notes.get(id));
      },
      toShare: function() {
        this.shareView.render();
      },
      default: function() {
        if (moble.user.connected())
          this.navigate('timeline', true);
        else
          this.navigate('login', true);
      }
    });
  });
