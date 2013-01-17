
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
          events: {
            'click': 'share'
          },
          notes: null,
          initialize: function(options) {
            this.notes = options.notes;
          },
          render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            (this.model.shared(this.notes.selected())) ? this.$el.addClass('shared') : this.$el.removeClass('shared');

            return this;
          },
          share: function() {
            var self = this;
            _.each(this.notes.selected(), function(note) {
              note.share(self.model.get('FBId'));
            });
          }
        }),

        FriendsView = Backbone.View.extend({
          subViews: null,
          notes: null,
          initialize: function(options) {
            this.subViews = [];
            this.notes = options.notes;
            
            _.bindAll(this, 'renderFriend', 'unrenderFriend');
            this.collection.bind('add', this.renderFriend);
            this.collection.bind('remove', this.unrenderFriend);
          },
          render: function() {
            this.collection.each(this.renderFriend);
          },
          renderFriend: function(friend) {
            var subView = new FriendView({ model: friend, notes: this.notes });
            this.subViews.push(subView);
            this.$el.append(subView.render().el);
          },
          unrenderFriend: function(friend) {
            var subView = _(this.subViews).find(function(view) { return view.model === friend; });
            this.subViews = _(this.subViews).without(subView);
            subView.remove();
          }
        }),

        ContentView = Backbone.View.extend({
          el: $('#content'),
          template: Handlebars.compile($('#content', tmpl).html()),
          initialize: function(options) {
            this.friendsView = new FriendsView({ collection: options.friends, notes: options.notes });
          },
          render: function() {
            this.$el.html(this.template());
            this.renderSubview(this.friendsView, '#friends');
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
