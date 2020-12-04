var indexRouter = require('./../routes/index');
var tweets = require("./../routes/tweets");

module.exports = function (app) {

    app.use('/', indexRouter);
    app.use('/tweets', tweets);

}