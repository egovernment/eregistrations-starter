'use strict';

var Database = require('dbjs')
  , resolve  = require('path').resolve
  , deferred = require('deferred')
  , readdir  = require('fs2/readdir')
  , unlink   = require('fs2/unlink')

  , testPath = resolve(__dirname, '__playground/index');

module.exports = function (t, a, d) {
	var db = new Database();
	db.Object({ foo: 'foo', bar: 23 });

	t(db, testPath).done(function (stream) {
		db.Object({ foo: 'foo', bla: 23 });
		setTimeout(function () {
			stream.end();
			return readdir(testPath, { type: { file: true } })(function (names) {
				a(names.length, 3, "Files Count");
				return deferred.map(names, function (name) {
					if (name === 'x') return;
					return unlink(resolve(testPath, name));
				});
			})(false).done(d, d);
		}, 100);
	});
};
