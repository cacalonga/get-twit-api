var Twit = require('twit');

var T = module.exports = new Twit({
  consumer_key: 'key',
  consumer_secret: 'scretKey',
  access_token: 'acccestoken',
  access_token_secret: 'accestokenscret',
  timeout_ms: 60 * 1000,  // optional HTTP request timeout to apply to all requests.
  strictSSL: true,     // optional - requires SSL certificates to be valid.

});


/* var tweetListDummyDB = [];
var streamDummyDB = [];
 // List
T.get('search/tweets', { q: 'twitter', count: 100 }, function (err, data, response) {

  var datalenght = Object.keys(data.statuses).length;
  console.log(response);
  for (let i = 0; i < datalenght; i++) {
    tweetListDummyDB.push(data.statuses[i]);
  }

  tweetList = [];
  console.log(Object.keys(data.statuses).length);
})

// stream function
var stream = T.stream('statuses/filter', { track: ['#twitter', '@twitter'] })

stream.on('tweet', function (tweet) {
  streamData = tweet;
  streamDummyDB.push(tweet);
  console.log("----------------------------------------------");
  //console.log(streamDummyDB[(streamDummyDB.length - 1)]);
  console.log("----------------------------------------------");

});

module.exports.streamDummyDB = streamDummyDB;
module.exports.tweetListDummyDB = tweetListDummyDB; */
