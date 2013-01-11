
define(['jquery', 'underscore', 'backbone', 'handlebars', 'text!templates/notif.tmpl'],
  function($, _, Backbone, Handlebars, tmpl) {

    return Backbone.View.extend({
      el: $('#notif'),
      templates: {
        onNoteCreated: Handlebars.compile($('#onNoteCreated', tmpl).html()),
        onNoteRemoved: Handlebars.compile($('#onNoteRemoved', tmpl).html()),
        onNoteUpdated: Handlebars.compile($('#onNoteUpdated', tmpl).html()),
        onNoteShared: Handlebars.compile($('#onNoteShared', tmpl).html())
      },
      initialize: function(options) {
        _.bindAll(this, 'onNoteCreated', 'onNoteRemoved', 'onNoteUpdated', 'onNoteShared');

        moble.on('noteCreated', this.onNoteCreated);
        moble.on('noteRemoved', this.onNoteRemoved);
        moble.on('noteUpdated', this.onNoteUpdated);
        moble.on('noteShared', this.onNoteShared);
      },
      onNoteCreated: function(note) {
        this.$el.html(this.templates.onNoteCreated(note));
      },
      onNoteRemoved: function(note) {
        this.$el.html(this.templates.onNoteRemoved(note));
      },
      onNoteUpdated: function(note) {
        this.$el.html(this.templates.onNoteUpdated(note));
      },
      onNoteShared: function(note) {
        this.$el.html(this.templates.onNoteShared(note));
      }
    });
  });
