
/**
 * create-poke.js
 *
 * Create poke
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
	var User = db.col('users');
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

	var to_profile = yield User.findOne({
		uid: to_uid
	});
	var from_profile = yield User.findOne({
		uid: from_uid
	});

	if(!to_profile || !from_profile){
		this.status = 404;
		this.body = {
			code: 404,
			message: "Not found such user.",
		};
		return;
	}

	var poke = yield Poke.findOne({
		  from: from_uid
		, to: to_uid
	});

	if(poke){
		this.status = 409;
		this.body = {
			code: 409,
			message: "Duplicate poke.",
		};
		return;
	}

	var result = yield Poke.insert({
		  from: from_uid
		, to: to_uid
	});

	this.body = {
		code: 200,
	};
};
