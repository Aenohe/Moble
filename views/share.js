
define(['jquery', 'underscore', 'backbone', 'handlebars', 'text!templates/share.html'],
  function($, _, Backbone, Handlebars, tmpl) {

    var Navbar = Backbone.View.extend({
      template: Handlebars.compile($('#navbar', tmpl).html()),
      render: function() {
        this.$el.html(this.template());
      }
    });

    var Content = Backbone.View.extend({
      template: Handlebars.compile($('#content', tmpl).html()),
      render: function() {
        this.$el.html(this.template(this.model.toJSON()));
      }
    });

    return Backbone.View.extend({
      initialize: function() {
        this.navbar = new Navbar({ el: $('#navbar') });
        this.content = new Content({ model: this.model, el: $('#content') });
      },
      render: function() {
        this.navbar.render();
        this.content.render();
      }
    });
  });