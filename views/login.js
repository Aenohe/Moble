
define(['jquery', 'underscore', 'backbone', 'handlebars', 'facebook', 'text!templates/login.html'],
  function($, _, Backbone, Handlebars, FB, tmpl) {
    var LoginView = Backbone.View.extend({
      el: '#content',
      collection: [],
      template: Handlebars.compile($('#tmpl-login', tmpl).html()),
      events: {
        'click button': 'login'
      },
      initialize: function() {

      },
      render: function(collection) {
        this.collection = collection || this.collection;
        this.$el.html( this.template(this.collection) );
      },

      login: function() {
        FB.login(function(res) {
          if (res.status === 'connected')
            console.log('connected');
          else
            console.log('disconnected');
        }, { scope: 'email' });
      }
    });

    return LoginView;
  });