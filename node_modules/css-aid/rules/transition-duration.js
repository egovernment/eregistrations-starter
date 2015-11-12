'use strict';

var re = /([;\{]\s*)transition-duration\s*:\s*([a-zA-Z% 0-9\-\.\(\),]+)(\s*[;\}])/g

  , replacement = '-webkit-transition-duration: $2;' +
	' -moz-transition-duration: $2;' +
	' -o-transition-duration: $2;' +
	' transition-duration: $2';

module.exports = exports = function (str) {
	return str.replace(re, '$1' + replacement + '$3');
};
exports.replacement = replacement;
