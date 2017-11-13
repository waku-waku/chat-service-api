'use strict';

var path = require('path');


/**
 * Config.
 */

var config = {
	env: process.env.NODE_ENV,

	root: path.normalize(__dirname + '/../../..'),

	port: process.env.PORT || 3000,

	ip: process.env.IP || 'localhost',

	db: {
		url:'mongodb://localhost:27017/chat_service'
	},

	seedDB: false,

	secret: {
		session: 'secret'
	}

};

console.log(config.root);

module.exports = config;
