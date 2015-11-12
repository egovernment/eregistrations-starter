'use strict';

var Database = require('dbjs')
  , resolve  = require('path').resolve
  , readFile = require('fs2/read-file')
  , unlink   = require('fs2/unlink')

  , testPath = resolve(__dirname, '../__playground/lib-write-snapshot');

module.exports = function (t, a, d) {
	var db = new Database();
	db.Object({ foo: 'foo', bar: 23 });
	t(db, testPath)(function () {
		return readFile(testPath)(function (data) {
			a(String(data).split('\n').length, 8);
			return unlink(testPath);
		});
	}).done(d, d);
};
