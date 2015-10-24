
/**
 * get-room-info.js
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
	var Room = db.col('rooms');

	var profile = yield Room.findOne({
		rid: this.params.rid
	});

	this.body = profile;
};
