
define(['jquery', 'underscore', 'backbone', 'text!templates/timeline.html'],
  function($, _, Backbone, tmpl) {

    var NoteView = Backbone.View.extend({
      tagName: 'li',
      className: 'note well',
      template: Handlebars.compile($('#tmpl-note', tmpl).html()),
      events: {
        'click .remove': 'removeIt'
      },
      render: function() {
        console.log(this.model);
        this.$el.html(this.template(this.model.toJSON()));
        return this;
      },
      removeIt: function() {
        this.model.destroy();
        this.remove();
      }
    });

    return NoteView;
  });