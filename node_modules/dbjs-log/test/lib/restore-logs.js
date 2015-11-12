'use strict';

var Database = require('dbjs')
  , resolve  = require('path').resolve
  , resolveLog = require('../../lib/resolve-log')
  , path     = resolve(__dirname, '../__playground/lib/resolve-log');

module.exports = {
	Latest: function (t, a, d) {
		var db = new Database();
		resolveLog(path)(function (data) {
			return t(db, data.log)(function () {
				a(db.moi, undefined, "Snapshot data");
				a(db.ed.firstName, 'Edward3', "Log data");
				a(db.elix.firstName, 'Elizabetsh4', "Log data #2");
			});
		}).done(d, d);
	},
	At: function (t, a, d) {
		var db = new Database();
		resolveLog(path, { at: 1400080290283378 })(function (data) {
			return t(db, data.log)(function () {
				a(db.moi, undefined, "Snapshot data");
				a(db.ed.firstName, 'Edward2', "Log data");
				a(db.elo.firstName, 'Eleonora3', "Log data #2");

				a(db.eli, undefined, "Past at");
			});
		}).done(d, d);
	}
};
