'use strict';

var normalize   = require('es5-ext/string/#/normalize')
  , replace = require('es5-ext/string/#/plain-replace-all');

module.exports = function (dbFile, file) {
	return replace.call(dbFile.__id__, '/', '-') + '.' +
		normalize.call(dbFile.database.Filename.adapt(file.name));
};
