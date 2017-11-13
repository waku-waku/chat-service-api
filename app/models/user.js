var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');
var crypto = require('crypto');
var uuid = require('node-uuid');
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

// UserSchema.methods.setDeviceToken = function () {
// 	this.device_token = crypto.randomBytes(16).toString('hex');
// };

// UserSchema.methods.setTime = function () {
// 	this.create_date = moment().format("YYYY-MM-DD HH:mm:ss"); 
// 	this.update_date = moment().format("YYYY-MM-DD HH:mm:ss"); 
// 	this.timestamp = moment(this.update_date).unix();
// };

// UserSchema.methods.setId = function () {
// 	this.user_id = this._id;
// };

UserSchema.methods.setEmailAndPassword = function (email, password) {
  this.email = email;
  this.setHashedPassword(password);
};

UserSchema.methods.setHashedPassword = function (password) {
  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.comparePassword = function (password) {
	console.log(password);
	return bcrypt.compareSync(password, this.password, function(err, isValid) {
		if (err) {
		  throw new Error('Sorry, we were not able to find a user with that username and password.');
		} else {
			console.log(isValid);
		  return isValid;
		}
	});
};

UserSchema.methods.updateTimestamp = function () {
	// this.updateTime = moment().format("YYYY-MM-DD HH:mm:ss");
  this.timestamp = moment().unix();
};


module.exports = mongoose.model('User', UserSchema, 'users');
