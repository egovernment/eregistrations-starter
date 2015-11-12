'use strict';

module.exports = function (t, a) {
	var ul;
	a.throws(function () { t({}); }, TypeError);
	if (typeof document === 'undefined') return;
	ul = document.createElement('ul');
	a(t(ul), ul);
};
