'use strict';

var re = /([;\{]\s*)flex-wrap\s*:\s*([a-zA-Z\-]+)(\s*[;\}])/g

  , replacement = '-webkit-flex-wrap: $2; flex-wrap: $2';

module.exports = exports = function (str) {
	return str.replace(re, '$1' + replacement + '$3');
};
exports.replacement = replacement;
