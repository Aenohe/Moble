
define(['jquery', 'underscore', 'backbone', 'socket'],
  function($, _, Backbone, socket) {

    return Backbone.Model.extend({
      idAttribute: "_id",
      initialize: function() {
        this.bind('change:name', this.nameChanged);
        this.bind('change:description', this.descriptionChanged);
        this.bind('change:quantity', this.quantityChanged);
        this.bind('change:price', this.priceChanged);
        this.bind('change:date', this.dateChanged);
      },
      nameChanged: function() {
        socket.emit('updateNoteName', {FBId: moble.user.get('FBId'), note_id: this.id, name: this.get('name') });
      },
      descriptionChanged: function() {
        socket.emit('updateNoteDescription', {FBId: moble.user.get('FBId'), note_id: this.id, description: this.get('description') });
      },
      quantityChanged: function() {
        socket.emit('updateNoteQuantity', {FBId: moble.user.get('FBId'), note_id: this.id, quantity: this.get('quantity') });
      },
      priceChanged: function() {
        socket.emit('updateNotePrice', {FBId: moble.user.get('FBId'), note_id: this.id, price: this.get('price') });
      },
      dateChanged: function() {
        socket.emit('updateNoteDate', {FBId: moble.user.get('FBId'), note_id: this.id, date: this.get('date') });
      },
      removed: function() {
        socket.emit('removeNote', {FBId: moble.user.get('FBId'), note_id: this.id });
      }
    });
  });
