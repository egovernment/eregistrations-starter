'use strict';

var isElement = require('dom-ext/html-element/is-html-element');

module.exports = function (ol) {
	return Boolean(isElement(ol) && (ol.nodeName.toLowerCase() === 'ol'));
};
