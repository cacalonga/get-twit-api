var express = require('express');
var router = express.Router();
var Twit = require('twit');
var showingDB = require("../model/readyTheShowTweetsDB");
var hashtag = "";
var TweetList = require("./../model/tweetList-db");
var accessTokenDB = require("./../model/accessTokenDB");
var TweetListModel;
var newTweetObj = {};
var T;
var tweetListDummyDB = [];
var streamDummyDB = [];

var tweetCount = 0;

function streamStart(tagname) {
    if (Object.keys(newTweetObj).length != 0) {
        T = new Twit(newTweetObj);
        // stream function
        var stream = T.stream('statuses/filter', { track: tagname });

        stream.on('tweet', function (tweet) {
            TweetList.find({ id: tweet.id }, function (err, twt) {
                if (err) {
                    throw err;
                }
                else {
                    if (twt.length == 0) {
                        new TweetList({
                            id: tweet.id,
                            created_at: tweet.created_at,
                            name: tweet.user.name,
                            screen_name: tweet.user.screen_name,
                            text: tweet.text
                        }).save(function (err, result) {
                            if (err) {
                                throw err;
                            }
                            else {
                                console.log(result);
                                streamDummyDB.push(result);
                            }
                        });
                    }
                }
            })
        });
    }
}



router.get('/', function (req, res, next) {
    //save DB
    if (Object.keys(newTweetObj).length != 0) {
        T = new Twit(newTweetObj);
        T.get('search/tweets', { q: hashtag, count: tweetCount }, function (err, data, response) {
            var datalenght = Object.keys(data.statuses).length;
            for (let i = 0; i < datalenght; i++) {
                TweetList.find({ id: data.statuses[i].id }, function (err, twt) {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        if (twt.length == 0) {
                            new TweetList({
                                id: data.statuses[i].id,
                                created_at: data.statuses[i].created_at,
                                name: data.statuses[i].user.name,
                                screen_name: data.statuses[i].user.screen_name,
                                text: data.statuses[i].text
                            }).save(function (err, result) {
                                if (err) {
                                    throw err;
                                }
                                else {
                                    console.log(result);
                                    tweetListDummyDB.push(result);
                                }
                            });
                        }
                    }
                });
            }
        })
        TweetList.find({}, function (err, twt) {
            if (err) {
                throw err;
            }
            else {
                if (twt.length > 0) {
                    res.render('tweets', { tweetList: twt })
                }
                else {
                    res.redirect('/');
                }
            }
        });
    }
});

router.post("/", function (req, res, next) {
    console.log(req.body.tokenID)
    accessTokenDB.find({ _id: req.body.tokenID }, function (err, result) {
        if (err) {
            throw err;
        }
        else {
            if (result.length > 0) {
                console.log(result[0]);
                hashtag = result[0].hashtag;
                tweetCount = req.body.txtTweetCount;
                newTweetObj = {
                    consumer_key: result[0].consumer_key,
                    consumer_secret: result[0].consumer_secret,
                    access_token: result[0].access_token,
                    access_token_secret: result[0].access_token_secret,
                };
                streamStart(hashtag);
                res.redirect("/tweets");
            }
            else {
                res.redirect("/");
            }
        }
    })
});

module.exports = router;