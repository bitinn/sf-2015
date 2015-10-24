
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

	if (!profile) {
		this.status = 404;
		this.body = {
			code: 404
			, message: 'room not found'
		};
		return;
	}

	delete profile['_id'];
	delete profile.code;

	this.body = {
		code: 200
		, data: profile
	};
};
