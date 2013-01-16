
define(['socket', 'jquery', 'underscore', 'backbone'],
  function(socket, $, _, Backbone) {

    return Backbone.Model.extend({
      idAttribute: "_id",
      defaults: {
        selected: false
      },
      initialize: function() {
        this.bind('change:name', this.updateName);
        this.bind('change:description', this.updateDescription);
        this.bind('change:quantity', this.updateQuantity);
        this.bind('change:price', this.updatePrice);
        this.bind('change:date', this.updateDate);
        this.bind('change:done', this.updateDone);
      },
      updateName: function() {
        socket.emit('updateNoteName', {FBId: moble.user.get('FBId'), note_id: this.id, name: this.get('name') });
      },
      updateDescription: function() {
        socket.emit('updateNoteDescription', {FBId: moble.user.get('FBId'), note_id: this.id, description: this.get('description') });
      },
      updateQuantity: function() {
        socket.emit('updateNoteQuantity', {FBId: moble.user.get('FBId'), note_id: this.id, quantity: this.get('quantity') });
      },
      updatePrice: function() {
        socket.emit('updateNotePrice', {FBId: moble.user.get('FBId'), note_id: this.id, price: this.get('price') });
      },
      updateDate: function() {
        socket.emit('updateNoteDate', {FBId: moble.user.get('FBId'), note_id: this.id, date: this.get('date') });
      },
      updateDone: function() {
        if ( this.get('done') )
          socket.emit('doNote', {FBId: moble.user.get('FBId'), note_id: this.id});
        else
          socket.emit('undoNote', {FBId: moble.user.get('FBId'), note_id: this.id});
      },
      share: function(user) {
        this.get('sharedTo').push(user);
        socket.emit('sharing', {FBId: moble.user.get('FBId'), note_id: this.id, FBId_invit: user});
      },
      unshare: function(user) {
        this.set('sharedTo', _(this.get('sharedTo').without(user)));
        socket.emit('unsharing', {FBId: moble.user.get('FBId'), note_id: this.id, FBId_invit: user});
      },
      toggleShare: function(user) {
        if (!_(this.get('sharedTo')).find(user))
          this.share(user);
        else
          this.unshare(user);
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
      remove: function() {
        socket.emit('removeNote', {FBId: moble.user.get('FBId'), note_id: this.id });
        this.collection.remove(this.id);
      }
    });
  });
