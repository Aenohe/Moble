
define(['jquery', 'underscore', 'backbone', 'models/note'],
  function($, _, Backbone, Note) {

    return Backbone.Collection.extend({
      model: Note,
      select: function(ids) {
        this.each(function(note) {
          note.unselect();
          if (_.contains(ids, note.id))
            note.select();
        });
      },
      do: function(notes) {
        _(notes).each(function(note) {
          note.do();
        });
      },
      undo: function(notes) {
        _(notes).each(function(note) {
          note.undo();
        });
      },
      selected: function() {
        return this.where({selected: true});
      },
      unselected: function() {
        return this.where({selected: false});
      },
      hasSelected: function() {
        return this.selected().length ? true : false;
      },
      selectedAreDone: function() {
        return _.every(this.selected(), function(elem) { return elem.done(); });
      },
      selectedAreMine: function() {
        return _.every(this.selected(), function(elem) { return elem.get('ownerId') == moble.user.get('FBId'); });
      }
    });
  });
