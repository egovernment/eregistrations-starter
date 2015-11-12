'use strict';

var punt  = require('punt')
  , debug = require('debug-ext')('start-service')
  , env   = require('../env')
  , db    = require('mano').db;

if (env.ipcPort) {
	punt.bind('0.0.0.0:' + env.ipcPort).on('message', function (type, data) {
		var fn;
		try {
			fn = new Function('db', 'require', data);
			console.log("-------------- IPC eval begin");
			fn(db, require);
			console.log("-------------- IPC eval end");
		} catch (e) {
			console.error("IPC injection failed!");
			console.error(e.stack);
			return;
		}
	});
	debug('ipc communication channel [' + env.ipcPort + ']');
}
