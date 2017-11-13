/**
 * Main Application File
 */

'use strict';

/**
 * Module dependencies.
 */

var express = require('express');
var app = express();
var mongoose = require('mongoose');
var router = require('./routes/v1');
mongoose.Promise = require('bluebird');
var config = require('./config/environments');
var header = require('./lib/header.js');
var server = require('http').createServer(app);
const io = require('socket.io')(server);


/**
 * Connect DB.
 */

console.log(config.db.url + " urls");
mongoose.connect(config.db.url);
mongoose.connection.on('error', function(err) {
  console.error('MongoDB connection error: ' + err);
  process.exit(-1);
});


/**
 * Configure Express Server.
 */

require('./config/configure').defaultCall(app);


/**
 * Header dependencies.
 */

app.use(header.accessControlHeaders());


/**
 * API Routing.
 */

app.use('/api/v1', router);


/**
 * Test API.
 */

app.get('/test', function (req,res) {
	console.log(req);
	res.json({
		username: 'test successful!'
	});
});


/**
 * Start Chat Server.
 */

// io.on('connection', (socket) => {
//   console.log('a user connected');
//   socket.on('c2s_message', (msg) => {
//     console.log('message: ' + msg);
//   });
// });


// socket.ioをmodule化予定
const chat = io.sockets.on('connection', function (client) {

	console.log('connected!');
	client.emit('connected');

	 client.on('init', function(req) {
        client.set('room', req.room);
        client.set('name', req.name);
        chat.to(req.room).emit('message', req.name + " さんが入室");
        // ※4 クライアントを部屋に入室させる
        client.join(req.room);
    });

    client.on('msg', function(data) {
        var room, name;

        client.get('room', function(err, _room) {
            room = _room;
        });
        client.get('name', function(err, _name) {
            name = _name;
        });

        // ※6 受け取ったメッセージを部屋の皆に送信
        chat.to(room).emit('message', name + ": " + data);
    });
   	
   	client.on('disconnect', function() {
        var room, name;

        client.get('room', function(err, _room) {
            room = _room;
        });
        client.get('name', function(err, _name) {
            name = _name;
        });
        client.leave(room);
        chat.to(room).emit('message', name + " さんが退出");
    });
});



/**
 * Start Server.
 */
 
app.setup = server.listen(config.port, config.ip, function() {
	console.log('Express server listening on %d ...', config.port);
});
