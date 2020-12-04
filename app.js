var express = require('express');
//var config = require("./utils/config");


var app = express();

// System Init
//config.load();
require("./system/hbs-conf")(app);
require("./system/common-conf")(app);
require("./system/route-conf")(app);
require("./system/error-conf")(app);
//require("./system/insta-auth")(app);
//require("./system/database-conf");

module.exports = app;