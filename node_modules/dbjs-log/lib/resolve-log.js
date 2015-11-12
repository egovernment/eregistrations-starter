'use strict';

var deferred = require('deferred')
  , resolve  = require('path').resolve
  , readdir  = require('fs2/readdir')
  , readFile = require('fs2/read-file')

  , re = /([TZ\dx\.\-]+)-init\.db\.snapshot$/
  , xRe = /x/g
  , logFilter;

logFilter = function (data) {
	data = data.trim();
	if (!data) return false;
	if (data[0] === '#') return false;
	return true;
};

module.exports = function (logPath/*, options*/) {
	var options = Object(arguments[1]), at = Number(options.at);
	logPath = resolve(String(logPath));
	return readdir(logPath, { type: { file: true }, pattern: re })(function (names) {
		var snapshotFilename, logFilename;
		names.sort().reverse();
		if (!at) {
			snapshotFilename = names[0];
		} else {
			names.some(function (name, index) {
				if ((Date.parse(name.match(re)[1].replace(xRe, ':')) * 1000) > at) return false;
				snapshotFilename = name;
				return true;
			});
		}
		if (!snapshotFilename) throw new TypeError("No logs found at \'" + logPath + "'");
		logFilename = snapshotFilename.match(re)[1] + '.db.log';

		return deferred(readFile(resolve(logPath, snapshotFilename), 'utf8')(function (data) {
			return data.split('\n').filter(logFilter);
		}), readFile(resolve(logPath, logFilename), { encoding: 'utf8', loose: true })(function (data) {
			var result = [], current;
			if (data == null) return result;
			data = data.split('\n');
			while (!data[0].trim() || (data[0].trim()[0] === '#')) data.shift();
			data.some(function (data) {
				var stamp;
				data = data.trim();
				if (!data) {
					current = null;
					return;
				}
				if (data[0] === '#') return;
				stamp = data.split(' ', 1)[0];
				if (at && (Number(stamp) > at)) return true;
				data = data.slice(stamp.length).trim();
				if (!current) result.push(current = []);
				current.push(data);
			});
			return result;
		}))(function (data) {
			return {
				snapshot: data[0],
				log: data[1],
				snapshotFilename: snapshotFilename,
				logFilename: logFilename
			};
		});
	});
};
