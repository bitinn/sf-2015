
/**
 * get-rooms.js
 *
 * Return a list of rooms
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

	var rooms = yield Room.find();

	rooms = rooms.map(function (r) {
		delete r['_id'];
		delete r.code;
		return r;
	});

	this.body = {
		code: 200
		, data: rooms
	};
};
