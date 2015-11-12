'use strict';

module.exports = function (t, a) {
	var ol;
	a.throws(function () { t({}); }, TypeError);
	if (typeof document === 'undefined') return;
	ol = document.createElement('ol');
	a(t(ol), ol);
};
