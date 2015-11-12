'use strict';

var re = /([;\{]\s*)align-self\s*:\s*([a-zA-Z\-]+)(\s*[;\}])/g

  , replacement = '-webkit-align-self: $2; align-self: $2';

module.exports = exports = function (str) {
	return str.replace(re, '$1' + replacement + '$3');
};
exports.replacement = replacement;
