var users_management = require('./User'),
		mongoose = require('mongoose'),
		https = require('https');

mongoose.connect('mongodb://localhost/app11473320');

var Schema = mongoose.Schema;

mongoose.model('User', new Schema({ 
		FBId: { type: String, default: null }, 
		token: { type: String, default: null }, 
		firstName: { type: String, default: null }, 
		lastName: { type: String, default: null }, 
		email: { type: String, default: null }, 
		gender: { type: String, default: null }, 
		locale: { type: String, default: null },
		friends: {type: Array, default: []}}, 
           { versionKey: false, collection : 'users' })
	);

mongoose.model('Notes', new Schema({ 
		ownerId: { type: String, default: null }, 
		name: { type: String, default: null }, 
		price: { type: String, default: null }, 
		quantity: { type: String, default: null }, 
		date: { type: Date, default: null }, 
		description: { type: String, default: null }, 
		sharedTo: { type: Array, default: [] },
		done: {type: String, default: null},
		doneDate: {type: Date, default: null}}, 
           { versionKey: false, collection : 'notes' })
	);

var users = [];

console.log('loading DB...');

function check_id(ids, socket)
{
	var searched_id =  mongoose.model('User');
	searched_id.findOne({"FBId" : ids.FBId}, function (err, user) { 
		 if (user != null)
		 {
			user.token = ids.token;
			user.save(function (err) {
			});
			fb_request(ids, user, 'me', socket);
			fb_request(ids, user, 'me/friends', socket);
		 }
		 else
		 {
		 	var new_user = mongoose.model('User');
		 	nuser = add_user(ids);
		 	fb_request(ids, nuser, 'me', socket);
		 	fb_request(ids, nuser, 'me/friends', socket);
		 }
	});
	for (var i = 0; i < users.length; i++)
	{
		if (users[i].id == ids.FBId)
		{
			users[i] = new users_management.User(ids.FBId, socket);
			return;
		}
	}
	users[users.length] = new users_management.User(ids.FBId, socket);
}

function get_basics(id, socket)
{
	var suser = mongoose.model('User');
	suser.findOne({"FBId" : id}, function (err, data) { 
		 socket.emit('basics', data);
	});
}


function invitation(infos, socket)
{
	var searched_id =  mongoose.model('User');
	searched_id.findOne({"FBId" : infos.FBId_invit}, function (err, user) { 
		 if (user != null)
		 	socket.emit('news', false);
		 else
		 {
			socket.emit('news', true);
		 }
	});
}

function create_note(infos, socket)
{
	var new_note = mongoose.model('Notes');
	var nnote = new new_note();
	nnote.ownerId = infos.FBId;
	var searched_id =  mongoose.model('User');
	searched_id.findOne({"FBId" : infos.FBId}, function (err, user) { 
		 if (user != null)
		 {
		 	if (user.locale == 'fr_FR')
		 		nnote.name = 'Note mystere!';
		 	else
		 		nnote.name = 'Mysterious note!';
			nnote.save(function (err, note) {
				console.log(note.ownerId);
			socket.emit('createNote', note);
			});
		 }
		 else
		 	socket.emit('createNote', false);
	});
}

function remove_note(infos, socket)
{
	var searched_note = mongoose.model('Notes');
	searched_note.findOne({_id: infos.note_id, ownerId: infos.FBId}, function (err, note) {
		if (note != null)
		{
			for (var i = 0; i < users.length; i++)
 			{
 				if (note.sharedTo.indexOf(users[i].id) >= 0 && users[i].socket != socket)	
 				{
 					users[i].socket.emit('onNoteRemoved', note);
 				}
 			}
 			note.remove(function (err){	
 			});
			socket.emit('news', true);
		}
		else
			socket.emit('news', false);	
	});
}

function update_note_name(infos, socket)
{
	var searched_note = mongoose.model('Notes');
	searched_note.findOne({_id: infos.note_id, ownerId: infos.FBId}, function (err, note) {
		if (note != null)
		{
			note.name = infos.name;
 			note.save(function (err){	
 			});
 			for (var i = 0; i < users.length; i++)
 			{
 				if (note.sharedTo.indexOf(users[i].id) >= 0 && users[i].socket != socket)	
 				{
 					users[i].socket.emit('onNoteUpdated', note);
 				}
 			}
			socket.emit('news', true);
		}
		else
			socket.emit('news', false);	
	});
}

function update_note_price(infos, socket)
{
	var searched_note = mongoose.model('Notes');
	searched_note.findOne({_id: infos.note_id}, function (err, note) {
		if (note != null)
		{
			note.price = infos.price;
 			note.save(function (err){	
 			});
 			//socket.emit('onNoteUpdated',note);
 			for (var i = 0; i < users.length; i++)
 			{
 				if ((note.sharedTo.indexOf(users[i].id) >= 0 || users[i].id == note.ownerId) && users[i].id != infos.FBId)
 				{
 					//console.log(users[i].id+" / "+infos.FBId);
 					users[i].socket.emit('onNoteUpdated',note);
 				}
 			}
			socket.emit('news', true);
		}
		else
			socket.emit('news', false);	
	});
}

function update_note_quantity(infos, socket)
{
	var searched_note = mongoose.model('Notes');
	searched_note.findOne({_id: infos.note_id, ownerId: infos.FBId}, function (err, note) {
		if (note != null)
		{
			note.quantity = infos.quantity;
 			note.save(function (err){	
 			});
 			for (var i = 0; i < users.length; i++)
 			{
 				if (note.sharedTo.indexOf(users[i].id) >= 0 && users[i].socket != socket)	
 				{
 					users[i].socket.emit('onNoteUpdated',note);
 				}
 			}
			socket.emit('news', true);
		}
		else
			socket.emit('news', false);	
	});
}

function update_note_date(infos, socket)
{
	var searched_note = mongoose.model('Notes');
	searched_note.findOne({_id: infos.note_id, ownerId: infos.FBId}, function (err, note) {
		if (note != null)
		{
			console.log(infos.date);
			note.date = infos.date;
 			note.save(function (err){	
 			});
 			for (var i = 0; i < users.length; i++)
 			{
 				if (note.sharedTo.indexOf(users[i].id) >= 0 && users[i].socket != socket)
 				{
 					users[i].socket.emit('onNoteUpdated',note);
 				}
 			}
			socket.emit('news', true);
		}
		else
			socket.emit('news', false);	
	});
}

function update_note_description(infos, socket)
{
	var searched_note = mongoose.model('Notes');
	searched_note.findOne({_id: infos.note_id}, function (err, note) {
		if (note != null)
		{
			note.description = infos.description;
 			note.save(function (err){	
 			});
 			for (var i = 0; i < users.length; i++)
 			{
 				if ((note.sharedTo.indexOf(users[i].id) >= 0 || users[i].id == note.ownerId) && users[i].id != infos.FBId)
 				{
 					users[i].socket.emit('onNoteUpdated',note);
 				}
 			}
			socket.emit('news', true);
		}
		else
			socket.emit('news', false);	
	});
}

function timeline_content(infos, socket)
{
	var searched_note = mongoose.model('Notes');
	searched_note.find({ownerId: infos.FBId}).exec(function (status, value) {
		socket.emit('timelineContent', value);
	});
}

function do_note(infos, socket)
{
	var searched_note = mongoose.model('Notes');
	searched_note.findOne({_id: infos.note_id, ownerId: infos.FBId}, function (err, note) {
		if (note != null)
		{
			note.done = infos.FBId;
			note.doneDate = new Date();
			note.save(function (err){
 			for (var i = 0; i < users.length; i++)
 			{
 				if ((note.sharedTo.indexOf(users[i].id) >= 0 || users[i].id == note.ownerId) && users[i].id != infos.FBId)
 				{
 					users[i].socket.emit('onNoteUpdated',note);
 					//break;
 				}
 			}
			socket.emit('news', true);
 			});
		}
		else
		{
			var searched_note2 = mongoose.model('Notes');
			searched_note2.findOne({_id: infos.note_id}, function (err, note) {
				if (note != null)
				{
				    if (note.sharedTo.indexOf(infos.FBId) >= 0)
					{
						note.done = infos.FBId;
						note.doneDate = new Date();
						note.save(function (err){
							console.log(err);
				 			for (var i = 0; i < users.length; i++)
				 			{
				 				if ((note.sharedTo.indexOf(users[i].id) >= 0 || users[i].id == note.ownerId) && users[i].id != infos.FBId)
				 				{
				 					users[i].socket.emit('onNoteUpdated',note);
				 					//break;
				 				}
				 			}
							socket.emit('news', true);
				 		});
					}
				}
				else
					socket.emit('news', false);	
			});
		}
	});
}

function undo_note(infos, socket)
{
	var searched_note = mongoose.model('Notes');
	searched_note.findOne({_id: infos.note_id, ownerId: infos.FBId}, function (err, note) {
		if (note != null)
		{
			note.done = null;
			note.doneDate = null;
			note.save(function (err){	
 			for (var i = 0; i < users.length; i++)
 			{
 				if ((note.sharedTo.indexOf(users[i].id) >= 0 || users[i].id == note.ownerId) && users[i].id != infos.FBId)
 				{
 					console.log('undo_note onNoteUpdated');
					console.log(users[i].id);
 					users[i].socket.emit('onNoteUpdated',note);
 				}
 			}
			socket.emit('news', true);
 			});
		}
		else
		{
			var searched_note2 = mongoose.model('Notes');
			searched_note2.findOne({_id: infos.note_id}, function (err, note) {
			if (note != null)
			{
				if (note.sharedTo.indexOf(infos.FBId) >= 0)
				{
					note.done = null;
					note.doneDate = null;
					note.save(function (err){
		 			for (var i = 0; i < users.length; i++)
		 			{
		 				if ((note.sharedTo.indexOf(users[i].id) >= 0 || users[i].id == note.ownerId) && users[i].id != infos.FBId)
		 				{
		 					console.log('undo_note onNoteUpdated');
							console.log(users[i].id);
		 					users[i].socket.emit('onNoteUpdated',note);
		 				}
		 			}
					socket.emit('news', true);
		 			});
				}
				else
					socket.emit('news', false);		
			}
			else
				socket.emit('news', false);	
			});
		}
	
	});
}

function	share_note(ids, socket)
{
	var searched_id =  mongoose.model('User');
	searched_id.findOne({"FBId" : ids.FBId_invit}, function (err, user) { 
		 if (user != null)
		 {
		 	var searched_note = mongoose.model('Notes');
			searched_note.findOne({_id: ids.note_id}, function (err, note) {
				if (note != null)
				{
					if (note.ownerId != ids.FBId_invit)
					{
						if (note.sharedTo.indexOf(ids.FBId_invit) >= 0)
						{
							note.sharedTo.splice(note.sharedTo.indexOf(ids.FBId_invit), 1);
							note.save(function (err){	
							for (var i = 0; i < users.length; i++)
 							{
 								if (users[i].id == ids.FBId_invit)	
 								{
 									console.log('on remove note!!!!');
 									console.log(users[i].id);
 									users[i].socket.emit('onNoteRemoved',note);
 								}
 							}
 							});
						}
						else
						{
							note.sharedTo.push(ids.FBId_invit);
							note.save(function (err){	
								for (var i = 0; i < users.length; i++)
 							{
 								if (users[i].id == ids.FBId_invit)	
 								{
 									console.log('on shared note!!');
 									console.log(users[i].id);
 									users[i].socket.emit('onNoteShared',note);
 								}
 							}
 							});
						}
						socket.emit('news', true);
					}
					else
						socket.emit('news', false);	
				}
				else
					socket.emit('news', false);
			});
		 }
		 else
		 {
			socket.emit('news', false);
		 }
	});
}

function	disconnect(socket)
{
	for (var i = 0; i < users.length; i++)
	{
		if (users[i].socket.id == socket.id)
		{
			users.splice(i, 1);
			break;
		}
	}
	//mongoose.connection.close();
}

// Fonctions propres a db_management.js (non exportees)

function add_user(data)
{
	var new_user = mongoose.model('User');
	var nuser = new new_user();
	nuser.token = data.token;
	nuser.FBId = data.FBId;
	nuser.save(function (err){
		});
	return nuser;
}

function has_id(tab, id)
{
	for (var i = 0; i < tab.length; i++)
	{
		if (tab[i].FBId == id)
			return true;
	}
	return false;
}

function check_request(type, user, res, socket)
{
	if (type == 'me')
	{
		var data = JSON.parse(res);
	    user.firstName = data.first_name;
	    user.lastName =  data.last_name;
	    user.gender = data.gender;
	    user.locale = data.locale;
	    user.email = data.email;
	    user.save(function (err){
	    	//socket.broadcast.emit("onFriendConnected",user);
		});
	}
	else if (type == 'me/friends')
	{
		var datas = JSON.parse(res);
		var mobleFriends = [];
		var otherFriends = [];
		var return_friends;
		var db_users =  mongoose.model('User');
		db_users.find({}, function (err, data) {
			for (var i = 0; i < datas.data.length; i++)
			{
				var current_user = datas.data[i];
				if (has_id(data,current_user.id) == true && user.friends.indexOf(current_user.id) > -1)
				{
					mobleFriends.push({"FBId": current_user.id, "fullName": current_user.name});
				}
				else if (has_id(data,current_user.id) == true && user.friends.indexOf(current_user.id) < 0)
				{
					mobleFriends.push({"FBId": current_user.id, "fullName": current_user.name});
					user.friends.push(current_user.id);
					user.save(function (err){
					});
				}
				else
					otherFriends.push({"FBId": current_user.id, "fullName": current_user.name});
			}
			return_friends = {"user": user, "mobleFriends": mobleFriends, "otherFriends": otherFriends};
			for (var i = 0; i < users.length; i++)
			{
				
				if (mobleFriends.indexOf(users[i].id) >= 0)
				{
					users[i].socket.emit('onFriendsUpdated', return_friends);
				}
			}
			for (var i = 0; i < users.length; i++)
			{
				if (user.friends.indexOf(users[i].id) > -1)
				{
					users[i].socket.emit("onFriendConnected",user);
				}
			}
			socket.emit('check_connection',return_friends);
		});
	}
}

function fb_request(infos, user, func, socket)
{
	var optionsget = {
	    host : 'graph.facebook.com',
	    port : 443,
	    path : '/'+func+'?access_token='+infos.token,
	    method : 'GET'
	};

	callback = function(response)
	{
  		var str = '';

  		response.on('data', function (chunk) {
    		str += chunk;
  		});

 
 	 	response.on('end', function () {
 	 		if (response.statusCode == 200)
 	 			check_request(func, user, str, socket);
 	 		else
 	 		{
				console.log('Une erreur est survenue durant la requete Facebook.(! check access_token !)');
				socket.emit('check_connection', false);
 	 		}
 		});

 		response.on('error', function (e) {
			console.error(e);
 		});
	}

	https.request(optionsget, callback).end();
}

exports.get_basics = get_basics;
exports.add_user = add_user;
exports.check_id = check_id;
exports.invitation = invitation;
exports.create_note = create_note;
exports.remove_note = remove_note;
exports.update_note_name = update_note_name;
exports.update_note_price = update_note_price;
exports.update_note_quantity = update_note_quantity;
exports.update_note_date = update_note_date;
exports.update_note_description = update_note_description;
exports.timeline_content = timeline_content;
exports.do_note = do_note;
exports.undo_note = undo_note;
exports.share_note = share_note;
exports.disconnect = disconnect;
