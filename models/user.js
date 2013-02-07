
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
      shared: function(notes) {
        var self = this;
        return _(notes).every(function(note) { return _.contains(note.get('sharedTo'), self.get('FBId')); });
      },
      connected: function() {
        return this.get('FBId') ? true : false;
      },
      invite: function() {
        socket.emit('invitation', {FBId: moble.user.get('FBId'), FBId_invit: this.id });
      },
      isOwner: function(note) {
        if (this.get('FBId') == note.get('ownerId'))
          return true;
        return false;
      }
    });
  });
