'use strict';
 
var express = require('express');
var Promise = require('bluebird');

var response = {};
 
express.response.sendjson = function (datas, visible) {
	
	var array = [];

	if (datas instanceof Array) {
		
		for (var i=0; i<datas.length; i++) {
			var obj = {};
			visible.forEach(function (key) {
				obj[key] = datas[i][key];
			});
			array.push(obj);
		}

		return this.json(array);

	} else if (datas instanceof Object) {
		var obj = {};
		visible.forEach(function (key) {
			obj[key] = datas[key];
			console.log(obj);
		});

		return this.json(obj);
	}
	
};
 
express.response.senderror = function (data) {
 
};

module.exports = response;
