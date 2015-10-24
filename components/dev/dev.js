
/**
 * dev.js
 *
 * Local development environment setup
 */

var livereload = require('koa-livereload');
var asset = require('koa-static');
var cors = require('koa-cors');

module.exports = factory;

/**
 * Export a factory function instead of middleware
 *
 * @param   String  env  Environment name
 * @return  MW
 */
function factory(app) {
	if (app.env === 'dev') {
		app.use(livereload({
			port: 30001
		}));

		app.use(cors());
	}

	if (app.env === 'dev' || app.env === 'local') {
		app.use(asset('public', {
			maxage: 1000 * 60 * 60 * 24
		}));
	}
};
