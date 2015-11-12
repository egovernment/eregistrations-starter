'use strict';

var isElement = require('dom-ext/html-element/is-html-element');

module.exports = function (ul) {
	return Boolean(isElement(ul) && (ul.nodeName.toLowerCase() === 'ul'));
};
