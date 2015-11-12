'use strict';

var re = /([;\{]\s*)justify-content\s*:\s*([a-zA-Z\-]+)(\s*[;\}])/g

  , replacement = '-webkit-justify-content: $2; justify-content: $2';

module.exports = exports = function (str) {
	return str.replace(re, '$1' + replacement + '$3');
};
exports.replacement = replacement;
