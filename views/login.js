
define(['jquery', 'underscore', 'backbone', 'handlebars', 'text!templates/login.html',
        'facebook'],
  function($, _, Backbone, Handlebars, tmpl,
        FB) {

    var Navbar = Backbone.View.extend({
      template: Handlebars.compile($('#navbar', tmpl).html()),
      render: function() {
        this.$el.html(this.template());
      }
    });

    var NavbarRight = Backbone.View.extend({
      render: function() {
        this.$el.empty();
      }
    });

    var Content = Backbone.View.extend({
      template: Handlebars.compile($('#content', tmpl).html()),
      events: {
        'click button': 'login'
      },
      render: function() {
        this.$el.html(this.template());
      },
      login: function() {
        console.log('test');
        FB.login(function(res) {}, { scope: 'email' });
      }
    });

    return Backbone.View.extend({
      initialize: function() {
        this.navbar = new Navbar({ el: $('#navbar') });
        this.navbarRight = new NavbarRight({ el: $('#navbar-right') });
        this.content = new Content({ el: $('#content') });
      },
      render: function() {
        this.navbar.render();
        this.navbarRight.render();
        this.content.render();
      }
    });
  });
