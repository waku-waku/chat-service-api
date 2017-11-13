'use strict';

var express  = require('express')
var models   = require('../../models')
var response = require('../../lib/response')
var router   = express.Router()


/**
 * GET /v1/users/me
 */

router.get('/me', function (req, res, next) {
	var auth = req.headers.authorization;
  var bearer = auth.toString().split(' ');

	models.OAuthAccessToken
		.findOneAsync({token: bearer[1]})
		.then(function (accessToken) {
			return models.User.findOneAsync({_id: accessToken.user_id});
		})
		.done(function (user) {
			res.json({
				username: user.username,
				email: user.email
			});
		});
});


/**
 * GET /v1/users/:username
 */

router.get('/:username', function (req, res, next) {

	console.log(req.params.username);
	models.User
		.findOneAsync({username: req.params.username})
		.then(function (user) {
			if (!user) throw new Error('This user is not found.');
			// res.json(user);
			res.sendjson(user,
				['_id', 'username', 'fullname', 'email'])
		})
		.catch(function (err) {
			console.dir(err);
			res.status(400);
			res.send({
				error: err.toString()
			});
		});
});

module.exports = router;
