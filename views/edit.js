
define(['jquery', 'underscore', 'backbone', 'handlebars', 'text!templates/edit.html'],
  function($, _, Backbone, Handlebars, tmpl) {

    Handlebars.registerHelper('convertTime', function(time) {
      console.log(time);
      var date = (time) ? new Date(time) : new Date(),
          month = ((date.getMonth() + 1 < 10) ? '0' : '') + (date.getMonth() + 1),
          day = ((date.getDate() < 10) ? '0' : '') + date.getDate();

      return date.getFullYear() + '-' + month + '-' + day;
    });

    var Navbar = Backbone.View.extend({
      template: Handlebars.compile($('#navbar', tmpl).html()),
      render: function() {
        this.$el.html(this.template());
      }
    });

    var NavbarRight = Backbone.View.extend({
      template: Handlebars.compile($('#navbar-right', tmpl).html()),
      render: function() {
        this.$el.html(this.template());
      }
    });

    var Content = Backbone.View.extend({
      template: Handlebars.compile($('#content', tmpl).html()),
      events: {
        'blur #name': 'updateName',
        'blur #description': 'updateDescription',
        'blur #quantity': 'updateQuantity',
        'blur #price': 'updatePrice',
        'blur #date': 'updateDate'
      },
      render: function() {
        this.$el.html(this.template(this.model.toJSON()));
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
      clean: function() {
        this.undelegateEvents();
        this.$el.empty();
      }
    });

    return Backbone.View.extend({
      initialize: function() {
        this.navbar = new Navbar({ el: $('#navbar') });
        this.navbarRight = new NavbarRight({ el: $('#navbar-right') });
        this.content = new Content({ model: this.model, el: $('#content') });
      },
      render: function() {
        this.navbar.render();
        this.navbarRight.render();
        this.content.render();
      },
      clean: function() {
        this.content.clean();
      }
    });
  });