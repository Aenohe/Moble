
define(['jquery', 'underscore', 'backbone', 'handlebars', 'text!templates/notif.tmpl'],
  function($, _, Backbone, Handlebars, tmpl) {

    return Backbone.View.extend({
      el: $('#notif'),
      templates: {
        onNoteCreated: Handlebars.compile($('#onNoteCreated', tmpl).html()),
        onNoteRemoved: Handlebars.compile($('#onNoteRemoved', tmpl).html()),
        onNoteUpdated: Handlebars.compile($('#onNoteUpdated', tmpl).html()),
        onNoteShared: Handlebars.compile($('#onNoteShared', tmpl).html()),
        onFriendConnected: Handlebars.compile($('#onFriendConnected', tmpl).html())
      },
      initialize: function(options) {
        _.bindAll(this, 'onNoteCreated', 'onNoteRemoved', 'onNoteUpdated', 'onNoteShared', 'onFriendConnected');

        moble.on('noteCreated', this.onNoteCreated);
        moble.on('noteRemoved', this.onNoteRemoved);
        moble.on('noteUpdated', this.onNoteUpdated);
        moble.on('noteShared', this.onNoteShared);
        moble.on('friend:connected', this.onFriendConnected);
      },
      onNoteCreated: function(note) {
        this.$el.hide();
        this.$el.html(this.templates.onNoteCreated(note));
        this.$el.slideDown().delay(1000).slideUp();
      },
      onNoteRemoved: function(note) {
        this.$el.hide();
        this.$el.html(this.templates.onNoteRemoved(note));
        this.$el.slideDown().delay(1000).slideUp();      
      },
      onNoteUpdated: function(note) {
        this.$el.hide();
        this.$el.html(this.templates.onNoteUpdated(note));
        this.$el.slideDown().delay(1000).slideUp();
      },
      onNoteShared: function(note) {
        this.$el.hide();
        this.$el.html(this.templates.onNoteShared(note));
        this.$el.slideDown().delay(1000).slideUp();
      },
      onFriendConnected: function(friend) {
        this.$el.hide();
        this.$el.html(this.templates.onFriendConnected(friend));
        this.$el.slideDown().delay(1000).slideUp();
      }
    });
  });
