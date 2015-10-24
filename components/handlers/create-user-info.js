

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

	if(!result || !result.ok || result.ok !== 1){
		this.body = {
			code: 500,
			message: "DB error.",
		};
		return;
	}

	this.body = {
		code: 200,
		message: "",
		data : body
	};
};
