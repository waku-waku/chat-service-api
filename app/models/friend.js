"use strict";

var mongoose = require('mongoose');
var moment = require('moment');

var UserSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	username: {
		type: String,
		required: true
	},
	fullname: {
		type: String
	},
	description: {
		type: String
	},
	image_url: {
		type: String
	},
	is_activated: {
		type: Boolean,
		default: false,
		required: true
	},
	timestamp: {
		type: Number,
		required: true
	}
});

var FriendSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.ObjectId,
        required: true},
    friends: [UserSchema],
    created_at: {
    	type: Date},
});


FriendSchema.methods.setDate = function () {
	// this.updateTime = moment().format("YYYY-MM-DD HH:mm:ss");
  this.created_at = moment().format("YYYY-MM-DD HH:mm:ssZ")
};

module.exports = mongoose.model('Friend', FriendSchema, 'friends');
