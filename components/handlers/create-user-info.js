

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

	//console.dir(this);
	console.log("------------");
	console.dir(this.request.body);
	var profile = yield User.findOne({
		uid: this.params.id
	});
	console.log("------------");

	console.log("check before create user info: " + profile);
	console.dir(profile);


	if(profile.uid == null || profile.uid == "null" || profile.uid == "undefined"){
		var result = yield User.insert({
			  uid: this.params.id
			, name: this.params.name
			, title: this.params.title
			, info: this.params.info
			, location: this.params.location
			, image: this.params.image
		});

		console.log("create user info: " + result);
	}else{
		var result = {ok:"0", msg: "user is exist"};
	}
	this.body = result;
};
