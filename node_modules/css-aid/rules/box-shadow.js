'use strict';

var re = /([;\{]\s*)box-shadow\s*:\s*([a-zA-Z% 0-9\-\.]+)(\s*[;\}])/g

  , replacement = '-webkit-box-shadow: $2;' +
	' -moz-box-shadow: $2;' +
	' box-shadow: $2';

module.exports = exports = function (str) {
	return str.replace(re, '$1' + replacement + '$3');
};
exports.replacement = replacement;
