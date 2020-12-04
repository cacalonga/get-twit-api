var mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/twitter-vw");

var Schema = mongoose.Schema;

var AccessSchema = new Schema({
    name:{
        type: String,
        trim: true,
        required: true
    },
    consumer_key: {
        type: String,
        trim: true,
        required: true
    },
    consumer_secret: {
        type: String,
        trim: true,
        required: true
    },
    access_token: {
        type: String,
        trim: true,
        required: true
    },
    access_token_secret: {
        type: String,
        trim: true,
        required: true
    },
    hashtag:{
        type: String,
        trim: true,
        required: true
    },
    timeout_ms: {
        type: Number,
        default: 60 * 1000
    },
    strictSSL: {
        type: Boolean,
        default: true
    },
    deleted: {
        type: Boolean,
        default: false
    }
}, { versionKey: false });

var Accesss = module.exports = mongoose = mongoose.model("AccessToken", AccessSchema);