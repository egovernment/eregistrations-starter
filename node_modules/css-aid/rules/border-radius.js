'use strict';

var re = /([;\{]\s*)border-radius\s*:\s*([a-zA-Z% 0-9\-\.]+)(\s*[;\}])/g

  , replacement = '-moz-border-radius: $2;' +
	' -webkit-border-radius: $2;' +
	' -khtml-border-radius: $2;' +
	' border-radius: $2';

module.exports = exports = function (str) {
	return str.replace(re, '$1' + replacement + '$3');
};
exports.replacement = replacement;
