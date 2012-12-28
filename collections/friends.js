
define(['jquery', 'underscore', 'backbone', 'models/user'],
  function($, _, Backbone, User) {

    return Backbone.Collection.extend({
      model: User
    })
  });
