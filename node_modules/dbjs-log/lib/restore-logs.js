'use strict';

var deferred     = require('deferred')
  , database     = require('dbjs/valid-dbjs')
  , emptyPromise = deferred(undefined)
  , delay        = deferred.delay

  , unserialize;

unserialize = function (db, events, sourceId) {
	db._postponed_ += 1;
	events.forEach(function (data) { db.unserializeEvent(data, sourceId); });
	db._postponed_ -= 1;
};

module.exports = function (db, logs/*, options*/) {
	var options = Object(arguments[2]), sourceId = options.sourceId
	  , interval = options.interval, log = options.log, load;
	database(db);
	if (isNaN(interval)) interval = 100;

	// Load log
	if (!logs[0]) return emptyPromise;
	load = delay(function () {
		unserialize(db, logs.shift(), sourceId);
		if (log) log('.');
		if (logs[0]) return load();
	}, interval);
	return load();
};
