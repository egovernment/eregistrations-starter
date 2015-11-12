'use strict';

module.exports = function (t, a) {
	var menu;
	a.throws(function () { t({}); }, TypeError);
	if (typeof document === 'undefined') return;
	menu = document.createElement('menu');
	a(t(menu), menu);
};
