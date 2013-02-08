
define(['jquery', 'underscore', 'backbone', 'handlebars', 'text!templates/profile.tmpl', 'facebookSDK'],
  function($, _, Backbone, Handlebars, tmpl, FB) {

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
    
        ProfView = Backbone.View.extend({
          template: Handlebars.compile($('#profile', tmpl).html()),
          initialize: function() {
            _.bindAll(this, 'render');

            this.model.bind('change', this.render);
          },
          render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
          }
        }),

        FriendView = Backbone.View.extend({
          tagName: 'li',
          className: 'friend well',
          template: Handlebars.compile($('#friend', tmpl).html()),
          events: {
            'click': 'invite',
            'click .data': 'inviting',
            'click .btn_like': 'sharing'
          },
          render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
          },
          invite: function() {
            this.model.invite();
          },
          inviting: function (e) {
            FB.ui({method: 'apprequests',
              message: 'Moble is great !',
              to: e.currentTarget.id;
            });
            return false;
          },
          sharing: function () {
            FB.ui({
              method: 'feed',
              redirect_uri: 'https://moble.herokuapp.com/#profile',
              link: 'https://moble.herokuapp.com/',
              picture: 'https://moble.herokuapp.com/img/base-icon.png',
              name: 'Moble',
              caption: 'Mobling me',
              description: 'Hey, viens c\'est bien ici !'
            });
            return false;
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
          renderFriend: function(friend) {
            var subView = new FriendView({ model: friend });
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
            this.profileView = new ProfView({ model: options.user });
            this.friendsView = new FriendsView({ collection: options.friends });
          },
          render: function() {
            this.$el.html(this.template());
            this.renderSubview(this.profileView, '#profile');
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
