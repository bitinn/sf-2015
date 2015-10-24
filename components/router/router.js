
/**
 * router.js
 *
 * Setup routing table
 */

var api = require('koa-router')();

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

	app.use(api.routes())
	app.use(api.allowedMethods());
};
