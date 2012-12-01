
define(['jquery', 'underscore', 'backbone'],
  function($, _, Backbone) {

    var User = Backbone.Model.extend({
      FBId: null,
      token: null,
    });

    return User;
  });
