
define(['jquery', 'underscore', 'backbone', 'models/note'],
  function($, _, Backbone, Note) {

    return Backbone.Collection.extend({
      model: Note
    });
  });
