
define(['jquery', 'underscore', 'backbone', 'handlebars', 'views/note.js', 'collections/notes', 'text!templates/timeline.html'],
  function($, _, Backbone, Handlebars, NoteView, Notes, tmpl) {

    var TimelineView = Backbone.View.extend({
      el: '#content',
      collection: null,
      template: Handlebars.compile($('#tmpl-timeline', tmpl).html()),
      initialize: function() {
      },
      render: function() {
        var that = this;
        var data = (this.collection && this.collection.models) ? this.collection.models : [];

        this.$el.html(this.template());
        $(data).each(function() {
          that.renderNote(this);
        });
      },
      renderNote: function(data) {
        var noteView = new NoteView({
          model: data
        });
        $('#timeline', this.$el).append(noteView.render().el);
      },
      setCollection: function(data) {
        this.collection = new Notes(data);
        this.render();
      }
    });

    return TimelineView;
  });