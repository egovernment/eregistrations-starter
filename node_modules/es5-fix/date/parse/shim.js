'use strict';

var shim = require('es3-ext/date/parse')

  , original = Date.parse;

module.exports = function (str) {
	var result = shim(str);
	return (result === undefined) ? original(str) : result;
};
