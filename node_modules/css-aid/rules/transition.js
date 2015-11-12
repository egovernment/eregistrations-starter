'use strict';

var re = /([;\{]\s*)transition\s*:\s*([a-zA-Z% 0-9\-\.\(\),]+)(\s*[;\}])/g

  , replacement = '-webkit-transition: $2;' +
	' -moz-transition: $2;' +
	' -o-transition: $2;' +
	' transition: $2';

module.exports = exports = function (str) {
	return str.replace(re, '$1' + replacement + '$3');
};
exports.replacement = replacement;
