
define(['jquery', 'underscore', 'backbone', 'views/login', 'views/timeline', 'views/edit', 'views/share', 'views/profile', 'views/notif'],
  function($, _, Backbone, LoginView, TimelineView, EditView, ShareView, ProfileView, NotifView) {

    return Backbone.Router.extend({
      routes: {
        'login': 'toLogin',
        'timeline': 'toTimeline',
        'edit/:id': 'toEdit',
        'share/:id': 'toShare',
        'share': 'toShare',
        'profile': 'toProfile',
        "*actions": 'default'
      },
      initialize: function() {
        this.notifView = new NotifView();
        this.loginView = new LoginView();
        this.timelineView = new TimelineView({ user: moble.user, notes: moble.notes });
        this.editView = new EditView();
        this.shareView = new ShareView({ notes: moble.notes, friends: moble.mobleFriends });
        this.profileView = new ProfileView({ user: moble.user, friends: moble.otherFriends });
      },
      toLogin: function() {
        this.loginView.render();
      },
      toTimeline: function() {
        if (this.checkConnection()) {
          moble.notes.select([]);
          this.timelineView.render();  
        }
      },
      toEdit: function(id) {
        var note = moble.notes.get(id);

        if (this.checkConnection() && note) {
          this.editView.render(note);
          this.editView.focusOn('#name');
        }
      },
      toShare: function(id) {
        if (this.checkConnection()) {
          if (id)
            moble.notes.select([id]);
          this.shareView.render();  
        }
      },
      toProfile: function() {
        if (this.checkConnection())
          this.profileView.render();
      },
      checkConnection: function() {
        if (!moble.user.connected()) {
          this.navigate('login', true);
          return false;          
        }
        return true;
      },
      default: function() {
        if (this.checkConnection())
          this.navigate('timeline', true);
      }
    });
  });
