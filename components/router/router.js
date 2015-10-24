
/**
 * router.js
 *
 * Setup routing table
 */

var api = require('koa-router')();

var createUserInfo = require('../handlers/create-user-info');
var getUserInfo = require('../handlers/get-user-info');

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

	api.get('/api/users/:id', getUserInfo());
	api.get('/api/users', createUserInfo());

	app.use(api.routes())
	app.use(api.allowedMethods());
};
