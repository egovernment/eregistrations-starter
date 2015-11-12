'use strict';

module.exports = function (t, a) {
	var link;
	a.throws(function () { t({}); }, TypeError);
	if (typeof document === 'undefined') return;
	link = document.createElement('link');
	a(t(link), link);
};
