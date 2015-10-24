
/**
 * create-room.js
 *
 * Create a new room
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

	yield Room.insert({
		rid: this.request.body.rid
		, code: this.request.body.code
	});

	var profile = yield Room.findOne({
		rid: this.request.body.rid
	});

	this.body = {
		code: 200
		, data: profile
	};
};
