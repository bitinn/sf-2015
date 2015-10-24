

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

	var profile = yield User.findOne({
		uid: this.params.id
	});

	console.log("check before create user info: " + profile);

	var result;

	if(profile != null){
		result.ok = 0;
		result.msg = "user is exist.";
	}else{

		result = yield User.insert({
			  uid: this.params.id
			, name: this.params.name
			, title: this.params.title
			, info: this.params.info
			, location: this.params.location
			, image: this.params.image
		});

		console.log("create user info: " + result);
	}
	this.body = result;
};
