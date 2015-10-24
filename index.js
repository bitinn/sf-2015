
var koa = require('koa');
var logger = require('koa-logger');
var bodyparser = require('koa-bodyparser');
var cors = require('koa-cors');

var configFactory = require('./components/config/config');
var config = configFactory();

var db = require('./components/db/db');
var dev = require('./components/dev/dev');
var router = require('./components/router/router');

var app = koa();

app.use(logger());
dev(app);
app.use(cors());
app.use(bodyparser());
app.use(configFactory(true));
app.use(db());

router(app);
app.listen(config.server.port);
