
/**
 * cancel-poke.js
 *
 * Cancel poke
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
	var Poke = db.col('pokes');

	var to_uid = this.params.to;
	var from_uid = this.params.from;

	if(!to_uid || !from_uid){
		this.status = 400;
		this.body = {
			code: 400,
			message: "Invalid request",
		};
		return;
	}

	var poke = yield Poke.findOne({
		  from: from_uid
		, to: to_uid
	});

	if(!poke){
		this.status = 404;
		this.body = {
			code: 404,
			message: "Not found such poke.",
		};
		return;
	}

	var result = yield Poke.remove({
		  from: from_uid
		, to: to_uid
	});

	this.body = {
		code: 200,
	};
};
