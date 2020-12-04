var express = require('express');
var router = express.Router();
var T = require("../system/twit");
var Tweet = require("../model/readyTheShowTweetsDB");
var TokenDB = require("./../model/accessTokenDB");
var accessTokenDB = require("./../model/accessTokenDB");


router.post('/', function (req, res, next) {
  new TokenDB({
    name: req.body.txtAccountTitle,
    consumer_key: req.body.txtClientID,
    consumer_secret: req.body.txtClientSecret,
    access_token: req.body.txtAccessToken,
    access_token_secret: req.body.txtAccessTokenSecret,
    hashtag: req.body.txtHashtag
  }).save(function (err, result) {
    if (err) {
      throw err;
    }
    else {
      res.redirect("/tweets");
    }
  })
});

/* GET home page. */

router.get('/', function (req, res, next) {
  accessTokenDB.find({}, function (err, tokens) {
    if (err) {
      throw err;
    }
    else {
      if (tokens.length > 0) {
        res.render("index", { tokens: tokens });
      }
      else {

      }
    }
  })
});

module.exports = router;