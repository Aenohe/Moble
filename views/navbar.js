
define(['jquery', 'underscore', 'backbone', 'handlebars', 'facebook', 'text!templates/navbar.html'],
  function($, _, Backbone, Handlebars, FB, tmpl) {

    var NavView = Backbone.View.extend({
      el: '#nav',
      render: function() {
        this.$el.html(this.template());
      }
    });

    var LoginNavbarView = NavView.extend({
      template: Handlebars.compile($('#tmpl-login-navbar', tmpl).html())
    });
    var TimelineNavbarView = NavView.extend({
      template: Handlebars.compile($('#tmpl-timeline-navbar', tmpl).html())
    });

    var NavbarView = Backbone.View.extend({
      navs: [],
      el: '#navbar',
      template: Handlebars.compile($('#tmpl-navbar', tmpl).html()),
      events: {
        'click a.login': 'login',
        'click a.logout': 'logout'
      },
      initialize: function() {
        this.$el.html(this.template());
        this.navs['login'] = new LoginNavbarView();
        this.navs['timeline'] = new TimelineNavbarView();
      },
      render: function(name) {
        if (name && this.navs[name]) {
          this.navs[name].render();          
        }
      },
      
      login: function() {
        console.log('hihihihihihi');
      },
      logout: function() {
        FB.logout();
      }
    });

    return NavbarView;
  });