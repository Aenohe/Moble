
define(['socket', 'jquery', 'underscore', 'backbone', 'handlebars', 'text!templates/timeline.tmpl'],
  function(socket, $, _, Backbone, Handlebars, tmpl) {

    var NavbarView = Backbone.View.extend({
          template: Handlebars.compile($('#navbar', tmpl).html()),
          initialize: function() {
            _.bindAll(this, 'render');

            this.model.bind('change', this.render);
          },
          render: function() {
            this.$el.html(this.template(this.model.toJSON()));
          }
        }),

        NavbarRightView = Backbone.View.extend({
          template: Handlebars.compile($('#navbar-right', tmpl).html()),
          events: {
            'click #btn_create': 'createNote',
            'click #btn_share': 'shareNotes',
            'click #btn_remove': 'removeNotes'
          },
          initialize: function() {
            _.bindAll(this, 'render');

            this.collection.bind('change', this.render);
            this.collection.bind('remove', this.render);
          },
          render: function() {
            this.$el.html(this.template({hasSelected: this.collection.hasSelected()}));
          },
          createNote: function() {
            socket.emit('createNote', moble.user.toJSON());
            return false;
          },
          shareNotes: function() {
            moble.router.navigate('share', true);
            return false;
          },
          removeNotes: function() {
            _(this.collection.selected()).each(function(d) {
              d.remove();
            });
            this.collection.remove(this.collection.selected());
          }
        }),

        HeaderView = Backbone.View.extend({
          el: $('#header'),
          template: Handlebars.compile($('#header', tmpl).html()),
          initialize: function(options) {
            this.navbarView = new NavbarView({ model: options.user });
            this.navbarRightView = new NavbarRightView({ collection: options.notes });
          },
          render: function() {
            this.$el.html(this.template());
            this.renderSubview(this.navbarView, '#navbar');
            this.renderSubview(this.navbarRightView, '#navbar-right');
          },
          renderSubview: function(view, selector) {
            view.setElement(this.$(selector)).render();
          }
        }),

        NoteView = Backbone.View.extend({
          tagName: 'li',
          className: 'note well',
          template: Handlebars.compile($('#note', tmpl).html()),
          events: {
            'click [type="checkbox"]': 'toggleSelect',
            'click .elem': 'toEdit',
            'click .btn_share': 'toShare',
            'click .btn_remove': 'toRemove'
          },
          initialize: function() {
            _.bindAll(this, 'render');

            this.model.bind('change', this.render);
          },
          render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
          },
          toEdit: function() {
            moble.router.navigate('edit/' + this.model.id, true);
            return false;
          },
          toShare: function() {
            moble.router.navigate('share/' + this.model.id, true);
            return false;
          },
          toRemove: function() {
            this.model.remove();
            this.remove();
            return false;
          },
          toggleSelect: function() {
            this.model.toggleSelect();
            this.model.selected() ? this.$el.addClass('selected') : this.$el.removeClass('selected');
          }
        }),

        NotesView = Backbone.View.extend({
          subViews: null,
          initialize: function() {
            this.subViews = [];

            _.bindAll(this, 'renderNote', 'unrenderNote');
            this.collection.bind('add', this.renderNote);
            this.collection.bind('remove', this.unrenderNote);
          },
          render: function() {
            this.collection.each(this.renderNote);
          },
          renderNote: function(note) {
            var subView = new NoteView({ model: note });
            this.subViews.push(subView);
            this.$el.append(subView.render().el);
          },
          unrenderNote: function(note) {
            var subView = _(this.subViews).find(function(view) { return view.model === note; });
            this.subViews = _(this.subViews).without(subView);
            subView.remove();
          }
        }),

        ContentView = Backbone.View.extend({
          el: $('#content'),
          template: Handlebars.compile($('#content', tmpl).html()),
          initialize: function(options) {
            this.notesView = new NotesView({ collection: options.notes });
          },
          render: function() {
            this.$el.html(this.template());
            this.renderSubview(this.notesView, '#notes');
          },
          renderSubview: function(view, selector) {
            view.setElement(this.$(selector)).render();
          }
        });

    return Backbone.View.extend({
      initialize: function(options) {
        this.headerView = new HeaderView(options);
        this.contentView = new ContentView(options);
      },
      render: function() {
        this.headerView.render();
        this.contentView.render();
      }
    });
  });
