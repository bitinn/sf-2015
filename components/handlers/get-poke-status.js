/**
 * get-poke-status.js
 *
 * Return status
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

	var profile = yield Pokes.findOne({
		from: this.params.from
		, to: this.params.to
	});

	if (!profile) {
		this.status = 404;
		this.body = {
			code: 404
			, message: "poke not found"
		};
		return;
	}

	this.body = {
		code: 200
	};
};

