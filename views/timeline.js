
define(['jquery', 'underscore', 'backbone', 'handlebars', 'collections/notes', 'text!templates/timeline.html'],
  function($, _, Backbone, Handlebars, Notes, tmpl) {

    var TimelineView = Backbone.View.extend({
      el: '#content',
      collection: null,
      template: Handlebars.compile($('#tmpl-timeline', tmpl).html()),
      initialize: function() {
      },
      render: function() {
        var data = (this.collection) ? this.collection.toJSON() : [];
        this.$el.html(this.template(data));
      },
      setCollection: function(data) {
        this.collection = new Notes(data);
        this.render();
      }
    });

    return TimelineView;
  });