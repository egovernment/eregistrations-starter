'use strict';

var database          = require('dbjs/valid-dbjs')
  , resolve           = require('path').resolve
  , microtime         = require('microtime-x')
  , once              = require('timers-ext/once')
  , createWriteStream = require('fs').createWriteStream;

module.exports = function (db, logPath) {
	var breakAfter, stream, listener;
	database(db);
	stream = createWriteStream(resolve(String(logPath)));
	stream.write('# dbjs:log\n# at ' + microtime() + '\n\n');
	breakAfter = once(stream.write.bind(stream, '\n'));
	db.objects.on('update', listener = function (event) {
		stream.write(microtime() + ' ' + String(event) + '\n');
		breakAfter();
	});
	stream.on('finish', db.objects.off.bind(db.objects, 'update', listener));
	return stream;
};
