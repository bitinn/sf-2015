
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

	var query = this.request.query;

	var ids = yield Member.find({
		rid: this.params.rid
	});

	ids = ids.map(function (m) {
		return m.uid;
	});

	var users = yield User.where('uid').in(ids);

	var filtered = [];
	users.forEach(function (u) {
		if (u.uid === query.user) {
			return;
		}
		delete u['_id'];

		filtered.push(u);
	});

	this.body = {
		code: 200
		, data: filtered
	};
};
