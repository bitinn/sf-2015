/**
 * get-user-pokes.js
 *
 * Return other_profile_list
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
	var Pokes = db.col('pokes');

	var profile_list = yield Pokes.find({
		to: this.params.to
	});

	profile_list = profile_list.map(function(p) {
		return p.from;
	});

	var Users = db.col('users');
	var user_list = yield Users.where('uid').in(profile_list);

	this.body = {
		code:200
		,data:user_list
	};
};

