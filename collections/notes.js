
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
      selected: function() {
        return this.where({selected: true});
      },
      unselected: function() {
        return this.where({selected: false});
      },
      hasSelected: function() {
        return this.selected().length ? true : false;
      }
    });
  });
