'use strict';

var isElement = require('dom-ext/html-element/is-html-element');

module.exports = function (menu) {
	return Boolean(isElement(menu) && (menu.nodeName.toLowerCase() === 'menu'));
};
