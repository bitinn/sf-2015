
/**
 * create-user-info.js
 *
 * Create user info
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

	var body = this.request.body;

	if(!body || !body.uid){
		this.status = 400;
		this.body = {
			code: 400,
			message: "Invalid request",
		};
		return;
	}

	var profile = yield User.findOne({
		uid: body.uid
	});

	if(profile){
		this.status = 409;
		this.body = {
			code: 409,
			message: "User is already exist.",
		};
		return;
	}

	var result = yield User.insert({
		  uid: body.uid
		, name: body.name
		, title: body.title
		, info: body.info
		, location: body.location
		, image: body.image
	});

	var new_profile = yield User.findOne({
		  uid: body.uid
	});

	this.body = {
		code: 200,
		data : new_profile
	};
};
