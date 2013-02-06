
define(['facebook', 'jquery', 'underscore', 'backbone', 'handlebars', 'text!templates/login.tmpl'],
  function(FB, $, _, Backbone, Handlebars, tmpl) {

    var Navbar = Backbone.View.extend({
          template: Handlebars.compile($('#navbar', tmpl).html()),
          events: {
            'click .btn_login': 'toLogin'
          },
          render: function() {
            this.$el.html(this.template());
          },
          toLogin: function() {
            window.location = "https://facebook.com/dialog/oauth?" + 
            "client_id= 118094878340771" + 
            "&redirect_uri=https://moble.herokuapp.com/" + 
            "&response_type=code" + 
            "&scope=email";
            return false;
          }
        }),

        Header = Backbone.View.extend({
          el: $('#header'),
          template: Handlebars.compile($('#header', tmpl).html()),
          initialize: function() {
            this.navbar = new Navbar();
          },
          render: function() {
            this.$el.html(this.template());
            this.renderSubview(this.navbar, '#navbar');
          },
          renderSubview: function(view, selector) {
            view.setElement(this.$(selector)).render();
          }
        }),
        
        Content = Backbone.View.extend({
          el: $('#content'),
          template: Handlebars.compile($('#content', tmpl).html()),
          events: {
            'click #btn_login': 'toLogin'
          },
          render: function() {
            this.$el.html(this.template());
          },
          toLogin: function() {
            window.location = "https://facebook.com/dialog/oauth?" + 
            "client_id= 118094878340771" + 
            "&redirect_uri=https://moble.herokuapp.com/" + 
            "&response_type=code" + 
            "&scope=email";
            this.$el.addClass('loading');
          }
        });

    return Backbone.View.extend({
      initialize: function() {
        this.header = new Header();
        this.content = new Content();
      },
      render: function() {
        this.header.render();
        this.content.render();
      }
    });
  });
