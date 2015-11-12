'use strict';

var resolve = require('path').resolve
  , path    = resolve(__dirname, '../__playground/lib/resolve-log');

module.exports = {
	Latest: function (t, a, d) {
		t(path).done(function (data) {
			a(data.snapshot.length, 8, "Snapshot length");
			a(data.log.length, 4, "Log length");
			a(data.snapshotFilename, '2014-05-14T15x11x56.661Z-init.db.snapshot', "Snapshot filename");
			a(data.logFilename, '2014-05-14T15x11x56.661Z.db.log', "Log filename");
			d();
		}, d);
	},
	At: function (t, a, d) {
		t(path, { at: 1400080290283378 }).done(function (data) {
			a(data.snapshot.length, 6, "Snapshot length");
			a(data.log.length, 2, "Log length");
			a(data.snapshotFilename, '2014-05-14T15x11x29.762Z-init.db.snapshot', "Snapshot filename");
			a(data.logFilename, '2014-05-14T15x11x29.762Z.db.log', "Log filename");
			d();
		}, d);
	}
};
