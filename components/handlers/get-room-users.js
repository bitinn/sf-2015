
/**
 * get-room-users.js
 *
 * Return room info
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
	var Member = db.col('members');
	var User = db.col('users');

	var ids = yield Member.find({
		rid: this.params.rid
	});

	var users = yield User.where('uid').in(ids);

	this.body = {
		code: 200
		, message: ''
		, data: users
	};
};
