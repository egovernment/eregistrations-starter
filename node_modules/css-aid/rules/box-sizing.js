'use strict';

var re = /([;\{]\s*)box-sizing\s*:\s*([a-zA-Z% 0-9\-\.]+)(\s*[;\}])/g

  , replacement = '-moz-box-sizing: $2;' +
	' -webkit-box-sizing: $2;' +
	' box-sizing: $2';

module.exports = exports = function (str) {
	return str.replace(re, '$1' + replacement + '$3');
};
exports.replacement = replacement;
