
define(['jquery', 'underscore', 'backbone', 'models/note'],
  function($, _, Backbone, Note) {

    var Notes = Backbone.Collection.extend({
      model: Note
    });

    return Notes;
  });
