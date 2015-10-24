
/**
 * router.js
 *
 * Setup routing table
 */

var api = require('koa-router')();

var createUserInfo = require('../handlers/create-user-info');
var getUserInfo = require('../handlers/get-user-info');
var updateUserInfo = require('../handlers/update-user-info');
var getRoomInfo = require('../handlers/get-room-info');
var getRoomUsers = require('../handlers/get-room-users');
var verifyRoomCode = require('../handlers/verify-room-code');
var enterRoom = require('../handlers/enter-room');
var exitRoom = require('../handlers/exit-room');
var getRooms = require('../handlers/get-rooms');
var createRoom = require('../handlers/create-room');
var updateRoom = require('../handlers/update-room');

module.exports = myRouter;

/**
 * Internal router
 *
 * @param   Object  app  Koa object
 * @return  MW
 */
function myRouter(app) {
	if (!app) {
		return;
	}

	api.get('/', function *() {
		this.body = 'hello world';
	});

	api.post('/api/users', createUserInfo());
	api.get('/api/users/:uid', getUserInfo());
	api.put('/api/users/:uid',updateUserInfo());
	api.get('/api/rooms', getRooms());
	api.post('/api/rooms', createRoom());
	api.get('/api/rooms/:rid', getRoomInfo());
	api.put('/api/rooms/:rid', updateRoom());
	api.post('/api/rooms/:rid/verify', verifyRoomCode());
	api.get('/api/rooms/:rid/users', getRoomUsers());
	api.put('/api/rooms/:rid/users/:uid', enterRoom());
	api.del('/api/rooms/:rid/users/:uid', exitRoom());

	app.use(api.routes())
	app.use(api.allowedMethods());
};
