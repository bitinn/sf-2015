
/**
 * exit-room.js
 *
 * Remove user from room
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

	yield Member.remove({
		rid: this.params.rid
		, uid: this.params.uid
	});

	this.body = { code: 200 };
};
