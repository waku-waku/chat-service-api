'use strict';

var _ = require('underscore');
var bluebird = require('bluebird');

var models = {
	Friend: require('./friend'),
	User: require('./user'),
	OAuthAccessToken: require('./oauthAccessToken'),
	OAuthClient: require('./oauthClient'),
	OAuthRefreshToken: require('./oauthRefreshToken')
};

_.mapObject(models, function (val) {
	bluebird.promisifyAll(val);
	bluebird.promisifyAll(val.prototype);
});

module.exports = models;
