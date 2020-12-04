var mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/twitter-vw");

var Schema = mongoose.Schema;

var tweetSchema = new Schema({
    id: {
        type: String,
        trim: true,
        required: true
    },
    created_at: {
        type: Date,
        trim: true,
        required: true
    },
    name: {
        type: String,
        trim: true,
        required: true
    },
    screen_name: {
        type: String,
        trim: true,
        required: true
    },
    text: {
        type: String,
        trim: true,
        required: true
    },
    deleted: {
        type: Boolean,
        default: false
    }
}, { versionKey: false });

var TweetDB = module.exports = mongoose = mongoose.model("Tweets", tweetSchema);