
define(['jquery', 'underscore', 'backbone', 'models/user'],
  function($, _, Backbone, User) {

    return Backbone.Collection.extend({
      model: User,
      select: function(ids) {
        this.each(function(user) {
          user.unselect();
          if (_.contains(ids, user.id))
            user.select();
        });
      },
      selected: function() {
        return this.where({selected: true});
      },
      unselected: function() {
        return this.where({selected: false});
      }
    });
  });
