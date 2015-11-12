'use strict';

var memoize      = require('memoizee/weak-plain')
  , htmlDocument = require('dom-ext/html-document/valid-html-document');

module.exports = memoize(function (document) {
	var isRegular = true, timeout;
	var reset = function () {
		isRegular = true;
		timeout = null;
	};
	htmlDocument(document).addEventListener('click', function (event) {
		if (event.metaKey || event.ctrlKey || (event.which === 2) || (event.which === 3)) {
			isRegular = false;
			if (timeout) clearTimeout(timeout);
			timeout = setTimeout(reset, 0);
		}
	}, true);
	return function () { return isRegular; };
});
