'use strict';

var create = Object.create;

module.exports = function () {
	// http://code.google.com/p/chromium/issues/detail?id=72736
	// https://bugs.webkit.org/show_bug.cgi?id=54289

	return Object.defineProperty(create(null,
		{ x: { value: 'foo', configurable: true } }), 'x',
		{ value: 'bar' }).x === 'bar';
};
