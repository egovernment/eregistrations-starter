'use strict';

var resolveLog  = require('./lib/resolve-log')
  , restoreLogs = require('./lib/restore-logs')

  , unserialize;

unserialize = function (db, events, sourceId) {
	db._postponed_ += 1;
	events.forEach(function (data) { db.unserializeEvent(data, sourceId); });
	db._postponed_ -= 1;
};

module.exports = function (db, logPath/*, options*/) {
	var options = Object(arguments[2]), sourceId = options.sourceId;
	return resolveLog(logPath, options)(function (data) {
		// Load snapshot
		unserialize(db, data.snapshot, sourceId);
		return restoreLogs(db, data.log, options);
	});
};
