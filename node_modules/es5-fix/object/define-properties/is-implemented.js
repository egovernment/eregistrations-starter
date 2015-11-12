'use strict';

var create = Object.create;

module.exports = function () {
	return Object.defineProperties(create(null,
		{ x: { value: 'foo', configurable: true } }),
		{ x: { value: 'bar' } }).x === 'bar';
};
