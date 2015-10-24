
/**
 * update-user-info.js
 *
 * Return user info
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

	if (!profile){
		this.body = {
		code:404
		,messge:"user not find"
		};
		return;
	}
	console.log(this.request.body);
	var new_profile = yield User.update({
		uid: this.params.id
	},{$set:{body:this.request.body}}) 

	this.body = {
		code:200
		,data:new_profile
	};
};