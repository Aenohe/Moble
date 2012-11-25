
define(['jquery', 'underscore', 'backbone', 'handlebars', 'text!templates/timeline.html'],
  function($, _, Backbone, Handlebars, tmpl) {

    var TimelineView = Backbone.View.extend({
      el: '#content',
      collection: [{name: 'note 1'}, {name: 'note 2'}],
      template: Handlebars.compile($('#tmpl-timeline', tmpl).html()),
      initialize: function() {

      },
      render: function(collection) {
        this.collection = collection || this.collection;
        this.$el.html( this.template(this.collection) );
      }
    });

    return TimelineView;
  });