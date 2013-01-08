
define(['jquery', 'underscore', 'backbone', 'handlebars', 'text!templates/share.tmpl'],
  function($, _, Backbone, Handlebars, tmpl) {

    var NavbarRightView = Backbone.View.extend({
          template: Handlebars.compile($('#navbar-right', tmpl).html()),
          render: function() {
            this.$el.html(this.template());
            return this;
          }
        }),

        HeaderView = Backbone.View.extend({
          el: $('#header'),
          template: Handlebars.compile($('#header', tmpl).html()),
          initialize: function() {
            this.navbarRightView = new NavbarRightView();
          },
          render: function() {
            this.$el.html(this.template());
            this.renderSubview(this.navbarRightView, '#navbar-right');
          },
          renderSubview: function(view, selector) {
            view.setElement(this.$(selector)).render();
          }
        }),

        FriendView = Backbone.View.extend({
          tagName: 'li',
          className: 'friend well',
          template: Handlebars.compile($('#friend', tmpl).html()),
          render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
          }
        }),

        MobleFriendView = FriendView.extend({
          notes: null,
          events: {
            'click': 'share'
          },
          initialize: function(options) {
            this.notes = options.notes;
          },
          share: function() {
            var self = this;
            _.each(this.notes.selected(), function(note) {
              note.share(self.model.get('FBId'));
            });
          }
        }),

        OtherFriendView = FriendView.extend({
          events: {
            'click': 'invite'
          },
          render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
          },
          invite: function() {
            this.model.invite();
          }
        }),

        FriendsView = Backbone.View.extend({
          subViews: null,
          initialize: function(options) {
            this.subViews = [];
          
            _.bindAll(this, 'renderFriend', 'unrenderFriend');
            this.collection.bind('add', this.renderFriend);
            this.collection.bind('remove', this.unrenderFriend);
          },
          render: function() {
            this.collection.each(this.renderFriend);
          },
          unrenderFriend: function(friend) {
            var subView = _(this.subViews).find(function(view) { return view.model === friend; });
            this.subViews = _(this.subViews).without(subView);
            subView.remove();
          }
        }),

        MobleFriendsView = FriendsView.extend({
          notes: null,
          initialize: function(options) {
            this.notes = options.notes;
          },
          renderFriend: function(friend) {
            var subView = new MobleFriendView({ model: friend, notes: this.notes });
            this.subViews.push(subView);
            this.$el.append(subView.render().el);
          }
        }),

        OtherFriendsView = FriendsView.extend({
          renderFriend: function(friend) {
            var subView = new OtherFriendView({ model: friend });
            this.subViews.push(subView);
            this.$el.append(subView.render().el);
          }
        }),

        ContentView = Backbone.View.extend({
          el: $('#content'),
          template: Handlebars.compile($('#content', tmpl).html()),
          initialize: function(options) {
            this.mobleFriendsView = new MobleFriendsView({ collection: options.mobleFriends, notes: options.notes });
            this.otherFriendsView = new OtherFriendsView({ collection: options.otherFriends });
          },
          render: function() {
            this.$el.html(this.template());
            this.renderSubview(this.mobleFriendsView, '#moble-friends');
            this.renderSubview(this.otherFriendsView, '#other-friends');
          },
          renderSubview: function(view, selector) {
            view.setElement(this.$(selector)).render();
          }
        });

    return Backbone.View.extend({
      initialize: function(options) {
        this.headerView = new HeaderView();
        this.contentView = new ContentView(options);
      },
      render: function() {
        this.headerView.render();
        this.contentView.render();
      }
    });
  });
