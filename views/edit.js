
define(['jquery', 'underscore', 'backbone', 'handlebars', 'text!templates/edit.tmpl'],
  function($, _, Backbone, Handlebars, tmpl) {

    var NavbarRightView = Backbone.View.extend({
          template: Handlebars.compile($('#navbar-right', tmpl).html()),
          render: function() {
            this.$el.html(this.template());
            return this;
          }
        }),

        HeaderView = Backbone.View.extend({
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

        FormView = Backbone.View.extend({
          template: Handlebars.compile($('#form', tmpl).html()),
          events: {
            'blur #name': 'updateName',
            'blur #description': 'updateDescription',
            'blur #quantity': 'updateQuantity',
            'blur #price': 'updatePrice',
            'blur #date': 'updateDate',
            'click #done': 'updateDone'
          },
          render: function() {
            this.$el.html(this.template(this.model.toJSON()));
            return this;
          },
          updateName: function(e) {
            this.model.set('name', $(e.currentTarget).val());
          },
          updateDescription: function(e) {
            this.model.set('description', $(e.currentTarget).val());
          },
          updateQuantity: function(e) {
            this.model.set('quantity', $(e.currentTarget).val());
          },
          updatePrice: function(e) {
            this.model.set('price', $(e.currentTarget).val());
          },
          updateDate: function(e) {
            this.model.set('date', new Date($(e.currentTarget).val()).getTime());
          },
          updateDone: function(e) {
            (e.currentTarget.checked) ? this.model.do() : this.model.undo();
          },
          clean: function() {
            this.undelegateEvents();
            this.$el.empty();
          }
        });

        ContentView = Backbone.View.extend({
          template: Handlebars.compile($('#content', tmpl).html()),
          initialize: function() {
          },
          render: function(note) {
            this.$el.html(this.template());
            if (this.formView)
              this.formView.remove();
            this.formView = new FormView({ model: note });
            this.renderSubview(this.formView, '#form');
          },
          renderSubview: function(view, selector) {
            view.setElement(this.$(selector)).render();
          }
        });

    return Backbone.View.extend({
      initialize: function() {
        this.headerView = new HeaderView({ el: $('#header') });
        this.contentView = new ContentView({ el: $('#content') });
      },
      render: function(note) {
        this.headerView.render();
        this.contentView.render(note);
      },
      unbind: function() {
        this.headerView.undelegateEvents();
        this.contentView.undelegateEvents();
      }
    });
  });
