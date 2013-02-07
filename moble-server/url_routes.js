
var db = require('./db_management');

function check_events(socket) {

	socket.on('check_connection', function (ids) {
		if (ids && ids.FBId) {
			db.check_id(ids, socket);
		}
	});

	socket.on('invitation', function (data) {
		if (data && data.FBId_invit)
			db.invitation(data, socket);
	});

	socket.on('createNote', function (data) {
		if (data && data.FBId)
			db.create_note(data, socket);
	});

	socket.on('removeNote', function (data) {
		if (data && data.FBId && data.note_id)
			db.remove_note(data, socket);
	});

	socket.on('updateNoteName', function (data) {
		if (data && data.FBId && data.note_id && (typeof data.name != 'undefined'))
			db.update_note_name(data, socket);
	});

	socket.on('updateNotePrice', function (data) {
		if (data && data.FBId && data.note_id && (typeof data.price != 'undefined'))
			db.update_note_price(data, socket);
	});

	socket.on('updateNoteQuantity', function (data) {
		if (data && data.FBId && data.note_id && (typeof data.quantity != 'undefined'))
			db.update_note_quantity(data, socket);
	});

	socket.on('updateNoteDate', function (data) {
		if (data && data.FBId && data.note_id && (typeof data.date != 'undefined'))
			db.update_note_date(data, socket);
	});

	socket.on('updateNoteDescription', function (data) {
		if (data && data.FBId && data.note_id && (typeof data.description != 'undefined'))
			db.update_note_description(data, socket);
	});

	socket.on('timelineContent', function (data) {
		if (data && data.FBId)
			db.timeline_content(data, socket);
	});

	socket.on('doNote', function (data) {
		if (data && data.FBId && data.note_id)
			db.do_note(data, socket);
	});

	socket.on('undoNote', function (data) {
		if (data && data.FBId && data.note_id)
			db.undo_note(data, socket);
	});

	socket.on('sharing', function (data) {
		if (data && data.FBId_invit && data.note_id)
			db.share_note(data, socket);
	});
}

function disconnect_db() {
	db.disconnect();
};

exports.check_events = check_events;
exports.disconnect_db = disconnect_db;
