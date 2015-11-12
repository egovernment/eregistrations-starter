'use strict';

var Database = require('dbjs')
  , resolve  = require('path').resolve
  , readFile = require('fs2/read-file')
  , unlink   = require('fs2/unlink')

  , testPath = resolve(__dirname, '../__playground/lib-write-log');

module.exports = function (t, a, d) {
	var db = new Database(), stream = t(db, testPath);
	db.Object({ foo: 'foo', bar: 23 });

	setTimeout(function () {
		db.Object({ foo: 'foo', bla: 23 });
		setTimeout(function () {
			stream.end();
			readFile(testPath)(function (data) {
				a(String(data).split('\n').length, 12);
				return unlink(testPath);
			}).done(d, d);
		}, 100);
	}, 100);
};
