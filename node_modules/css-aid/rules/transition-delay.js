'use strict';

var re = /([;\{]\s*)transition-delay\s*:\s*([a-zA-Z% 0-9\-\.\(\),]+)(\s*[;\}])/g

  , replacement = '-webkit-transition-delay: $2;' +
	' -moz-transition-delay: $2;' +
	' -o-transition-delay: $2;' +
	' transition-delay: $2';

module.exports = exports = function (str) {
	return str.replace(re, '$1' + replacement + '$3');
};
exports.replacement = replacement;
