
/**
 * get-user-info.js
 *
 * Return user info
 */

module.exports = factory;

/**
 * Export a factory function instead of middleware
 *
 * @return  MW
 */
function factory() {
	return middleware;
};

function *middleware(next) {
	yield next;

	var db = this.db;
	var User = db.col('users');

	var profile = yield User.findOne({
		uid: this.params.uid
	});

	this.body = profile;
};