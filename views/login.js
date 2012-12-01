
define(['jquery', 'underscore', 'backbone', 'handlebars', 'facebook', 'text!templates/login.html'],
  function($, _, Backbone, Handlebars, FB, tmpl) {
    var LoginView = Backbone.View.extend({
      el: '#content',
      template: Handlebars.compile($('#tmpl-login', tmpl).html()),
      events: {
        'click button': 'login'
      },
      render: function() {
        this.$el.html( this.template() );
      },

      login: function() {
        FB.login(function(res) { }, { scope: 'email' });
      }
    });

    return LoginView;
  });