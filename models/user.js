
define(['jquery', 'underscore', 'backbone'],
  function($, _, Backbone) {

    return Backbone.Model.extend({
      idAttribute: "_id",
      defaults: {
        FBId: null,
        token: null
      },
      fullName: function() {
        var firstName = this.get('firstName') || '',
            lastName = this.get('lastName') || '';

        return firstName + ' ' + lastName;
      }
    });
  });
