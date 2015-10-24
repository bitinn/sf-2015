
/**
 * verify-room-code.js
 *
 * Check user gives valid room code
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

	if (!profile) {
		this.status = 404;
		this.body = {
			code: 404
			, message: 'room not found'
		};
		return;
	}

	if (!profile.code || profile.code !== this.request.body.code) {
		this.status = 403;
		this.body = {
			code: 403
			, message: 'room code not valid'
		};
		return;
	}

	this.body = {
		code: 200
	};
};
