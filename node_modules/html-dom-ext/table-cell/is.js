'use strict';

var isElement = require('dom-ext/html-element/is-html-element');

module.exports = function (el) {
	return Boolean(isElement(el) &&
		((el.nodeName.toLowerCase() === 'td') || (el.nodeName.toLowerCase() === 'th')));
};
