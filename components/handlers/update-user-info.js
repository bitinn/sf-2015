
/**
 * update-user-info.js
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

	if (!profile) {
		this.status = 404;
		this.body = {
			code: 404
			, message: 'user not found'
		};
		return;
	}

	delete this.request.body.uid;

	yield User.update({
		uid: this.params.uid
	}, this.request.body);

	var new_profile = yield User.findOne({
		uid: this.params.uid
	});

	this.body = {
		code: 200
		, data: new_profile
	};
};
