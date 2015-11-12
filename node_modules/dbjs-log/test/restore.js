'use strict';

var Database = require('dbjs')
  , resolve  = require('path').resolve
  , path     = resolve(__dirname, '__playground/lib/resolve-log');

module.exports = {
	Latest: function (t, a, d) {
		var db = new Database();
		t(db, path).done(function () {
			a(db.moi.firstName, 'Mariusz2', "Snapshot data");
			a(db.nina.firstName, 'Nin', "Snapshot data #2");
			a(db.ed.firstName, 'Edward3', "Log data");
			a(db.elix.firstName, 'Elizabetsh4', "Log data #2");
			d();
		}, d);
	},
	At: function (t, a, d) {
		var db = new Database();
		t(db, path, { at: 1400080290283378 }).done(function (data) {
			a(db.moi.firstName, 'Mariusz', "Snapshot data");
			a(db.nina.firstName, 'Nina', "Snapshot data #2");
			a(db.ed.firstName, 'Edward2', "Log data");
			a(db.elo.firstName, 'Eleonora3', "Log data #2");

			a(db.eli, undefined, "Past at");
			d();
		}, d);
	}
};
