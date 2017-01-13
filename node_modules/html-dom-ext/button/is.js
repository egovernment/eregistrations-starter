'use strict';

var isElement = require('dom-ext/html-element/is-html-element');

module.exports = function (element) {
	return Boolean(isElement(element) && (element.nodeName.toLowerCase() === 'button'));
};
