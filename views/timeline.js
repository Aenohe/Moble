
define(['jquery', 'underscore', 'backbone', 'handlebars', 'facebook', 'socket', 'text!templates/timeline.html'],
  function($, _, Backbone, Handlebars, FB, socket, tmpl) {

    var Navbar = Backbone.View.extend({
      template: Handlebars.compile($('#navbar', tmpl).html()),
      events: {
        'click #logout': 'logout'
      },
      render: function() {
        this.$el.html(this.template());
      },
      logout: function() {
        FB.logout();
      }
    });

    var NavbarRight = Backbone.View.extend({
      template: Handlebars.compile($('#navbar-right', tmpl).html()),
      events: {
        'click #create': 'create'
      },
      render: function() {
        this.$el.html(this.template());
      },
      create: function() {
        socket.emit('createNote', moble.user.toJSON());
        return false;
      }
    });

    var Note = Backbone.View.extend({
      tagName: 'li',
      className: 'note well',
      template: Handlebars.compile($('#note', tmpl).html()),
      events: {
        'click .container': 'toEdit',
        'click .remove': 'toRemove'
      },
      render: function() {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
      },
      toEdit: function() {
        Backbone.history.navigate('note/' + this.model.get('_id') + '/edit', true);
      },
      toRemove: function() {
        this.model.removed();
        this.remove();
      }
    });

    var Content = Backbone.View.extend({
      template: Handlebars.compile($('#content', tmpl).html()),
      initialize: function() {
        _.bindAll(this, 'renderNote', 'unrenderNote');

        this._noteViews = [];

        this.collection.each(this.renderNote);

        this.collection.bind('add', this.renderNote);
        this.collection.bind('remove', this.unrenderNote);
      },
      renderNote: function(note) {
        var view = new Note({ model: note });
        this._noteViews.push(view);
        $('#notes').append(view.render().el);
      },
      unrenderNote: function(note) {
        var view = _(this._noteViews).find(function(v) { return v.model === note;});
        this._noteViews = _(this._noteViews).without(view);
        $(view.el).remove();
        view.remove();
      },
      render: function() {
        this.$el.html(this.template());
        this.collection.each(this.renderNote);
        return this;
      }
    });

    return Backbone.View.extend({
      initialize: function() {
        this.navbar = new Navbar({ el: $('#navbar') });
        this.navbarRight = new NavbarRight({ el: $('#navbar-right') });
        this.content = new Content({ collection: this.collection, el: $('#content') });
      },
      render: function() {
        this.navbar.render();
        this.navbarRight.render();
        this.content.render();
      }
    });
  });