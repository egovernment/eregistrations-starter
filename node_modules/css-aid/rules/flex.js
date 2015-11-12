'use strict';

var re = /([;\{]\s*)display\s*:\s*flex(\s*[;\}])/g

  , replacement;

replacement = 'display: -webkit-box; ' // OLD - iOS 6-, Safari 3.1-6
	+ 'display: -moz-box; '              // OLD - Firefox 19
	+ 'display: -ms-flexbox; '           // TWEENER - IE 10
	+ 'display: -webkit-flex; '          // NEW - Chrome
	+ 'display: flex';

module.exports = exports = function (str) {
	return str.replace(re, '$1' + replacement + '$2');
};
exports.replacement = replacement;
