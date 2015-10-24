

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

	console.dir(body);
	if(body.uid == undefined || body == null){
		console.log("body is null.");
		var result = {ok:"0", msg: "invalid request"};
		this.body = result;
		return;
	}

	var profile = yield User.findOne({
		uid: body.uid
	});

	console.log("check before create user info: " + profile);
	console.dir(profile);


	if(profile == null || profile.uid == null){
		var result = yield User.insert({
			  uid: body.uid
			, name: body.name
			, title: body.title
			, info: body.info
			, location: body.location
			, image: body.image
		});

		console.log("create user info: " + result);
	}else{
		var result = {ok:"0", msg: "user is exist"};
	}
	this.body = result;
};
