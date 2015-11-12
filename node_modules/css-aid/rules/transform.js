'use strict';

var re = /([;\{]\s*)transform\s*:\s*([a-zA-Z% 0-9\-\.\(\),]+)(\s*[;\}])/g

  , replacement = '-webkit-transform: $2;' +
	' -moz-transform: $2;' +
	' -o-transform: $2;' +
	' -ms-transform: $2;' +
	' transform: $2';

module.exports = exports = function (str) {
	return str.replace(re, '$1' + replacement + '$3');
};
exports.replacement = replacement;
