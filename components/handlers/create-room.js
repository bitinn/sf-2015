
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

	var body = this.request.body;

	if (!body || !body.rid || !body.code) {
		this.status = 400;
		this.body = {
			code: 400
			, message: 'request invalid'
		};
		return;
	}

	var profile = yield Room.findOne({
		rid: this.request.body.rid
	});

	if (profile) {
		this.status = 409;
		this.body = {
			code: 409
			, message: 'room id already exists'
		};
		return;
	}

	yield Room.insert({
		rid: this.request.body.rid
		, code: this.request.body.code
	});

	profile = yield Room.findOne({
		rid: this.request.body.rid
	});

	this.body = {
		code: 200
		, data: profile
	};
};
