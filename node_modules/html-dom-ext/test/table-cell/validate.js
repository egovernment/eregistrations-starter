'use strict';

module.exports = function (t, a) {
	var cell;
	a.throws(function () { t({}); }, TypeError);
	if (typeof document === 'undefined') return;
	cell = document.createElement('td');
	a(t(cell), cell);
	cell = document.createElement('th');
	a(t(cell), cell);
};
