
/**
 * router.js
 *
 * Setup routing table
 */

var api = require('koa-router')();

var getUserInfo = require('../handlers/get-user-info');
var getRoomInfo = require('../handlers/get-room-info');
var enterRoom = require('../handlers/enter-room');
var exitRoom = require('../handlers/exit-room');

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

	api.get('/api', function *() {
		this.body = 'hello world2';
	});

	api.get('/api/users/:uid', getUserInfo());
	api.get('/api/rooms/:rid', getRoomInfo());
	api.put('/api/rooms/:rid/users/:uid', enterRoom());
	api.del('/api/rooms/:rid/users/:uid', exitRoom());

	app.use(api.routes())
	app.use(api.allowedMethods());
};
