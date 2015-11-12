'use strict';

var dispatchEvent = require('dom-ext/html-element/#/dispatch-event-2');

module.exports = function (t, a, d) {
	var isRegular = t(document);
	a(isRegular(), true);
	dispatchEvent.call(document.documentElement, 'click', { metaKey: true });
	a(isRegular(), false);
	setTimeout(function () {
		a(isRegular(), true);
		d();
	}, 0);
};
