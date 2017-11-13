'use strict';

var express  = require('express')
var models   = require('../../models')
var response = require('../../lib/response')
var router   = express.Router()


/**
 * GET /v1/friends
 */

router.get('/', function (req, res, next) {
	var auth = req.headers.authorization;
  	var bearer = auth.toString().split(' ');

	models.OAuthAccessToken
		.findOneAsync({token: bearer[1]})
		.then(function (accessToken) {
			return models.Friend.findOneAsync({user_id: accessToken.user_id});
		})
		.then(function (friend) {
			if (!friend) throw new Error('This user do not have friends.');
			console.log(friend)
			res.sendjson(friend.friends, ['username', 'description', 'image_url']);
		})
		.catch(function (err) {
			res.status(400);
			res.send({
				error: err.toString()
			});
		})
});


/**
 * POST /v1/friends/:friend_name
 */

router.post('/:friend_id', function (req, res, next) {
	var auth = req.headers.authorization;
  	var bearer = auth.toString().split(' ');

  	var user_id;

  	async function getUser (bearer) {
  		let accessToken = await models.OAuthAccessToken.findOneAsync({token: bearer[1]})
  		console.log(accessToken)

  		let user = await models.User.findOneAsync({_id: req.params.friend_id})
  		console.log(user)

  		let friend = await models.Friend.findOneAsync({user_id: accessToken.user_id})
  		console.log(friend)

  		friend.friends.forEach(function (value) {
  			if (req.params.friend_id == value._id) throw new Error('This friend is already relationship.');
  		})

		friend.friends.push(user);
		friend.user_id = accessToken.user_id;
		friend.setDate()
		return friend.save()
  	}

  	getUser(bearer)
  		.then(function (f) {
  			console.log(f)
  			res.json(f)
  		})
  		.catch(function (err) {
			res.status(400);
			res.send({
				error: err.toString()
			});
		})


	// models.OAuthAccessToken
	// 	.findOneAsync({token: bearer[1]})
	// 	.then(function (accessToken) {

	// 		// ここらへんasync_await使って逐次処理的にfriendに格納
	// 		user_id = accessToken.user_id;
			
			
	// 		return result;
	// 	})
	// 	.then(function (result) {
	// 		console.log(result);
	// 		res.json(result);
	// 	});
		// .then(function (friend) {
		// 	if (!friend) {
		// 		let frined = new models.Friend();
		// 		friend.user_id = user_id;
		// 		// friend.friends.push() = models.User.findOneAsync({_id: req.params.friend_id});
		// 	}

		// })
		// .then(function (user) {
		// 	let frined = new models.Friend();
		// 	friend.friends.push(user);
		// 	friend.user_id = user_id;
		// 	friend.setDate()
		// 	return friend.save()
		// })
		// .done(function (friend) {
		// 	res.json({
		// 		'message': 'frined created successful'
		// 	})
		// });
});

/**
 * DELETE /v1/friends/:friend_name
 */

module.exports = router;
