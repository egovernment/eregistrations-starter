'use strict';

var database  = require('dbjs/valid-dbjs')
  , resolve   = require('path').resolve
  , writeFile = require('fs2/write-file')

  , compare = function (a, b) { return a.stamp - b.stamp; };

module.exports = function (db, logPath) {
	var result = [];
	database(db);
	logPath = resolve(String(logPath));
	db.objects._plainForEach_(function (obj) {
		var event = obj._lastOwnEvent_;
		if (!event) return;
		result.push(event);
	});
	return writeFile(logPath, '# dbjs:snapshot\n' +
		'# at ' + (new Date()).toISOString() + '\n' +
		'# ' + result.length + ' properties\n\n' +
		result.sort(compare).join('\n') + '\n');
};
