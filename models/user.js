
define(['socket', 'jquery', 'underscore', 'backbone'],
  function(socket, $, _, Backbone) {

    return Backbone.Model.extend({
      idAttribute: "_id",
      defaults: {
        selected: false
      },
      selected: function() {
        return this.get('selected');
      },
      select: function() {
        this.set('selected', true);
      },
      unselect: function() {
        this.set('selected', false);
      },
      toggleSelect: function() {
        this.set('selected', !this.get('selected'));
      },
      connected: function() {
        return this.get('FBId') ? true : false;
      },
      invite: function() {
        socket.emit('invitation', {FBId: moble.user.get('FBId'), FBId_invit: this.id });
      }
    });
  });
