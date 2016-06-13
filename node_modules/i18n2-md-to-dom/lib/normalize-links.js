'use strict';

var isElement = require('dom-ext/element/is-element')
  , isAnchor  = require('dom-ext/html-anchor-element/is-html-anchor-element')

  , isExternalLink = RegExp.prototype.test.bind(/^(?:[a-zA-Z]+:(?:\d+)?)?\/\//)
  , isFileLink = RegExp.prototype.test.bind(/\.[a-z0-9A-Z]+$/)
  , forEach = Array.prototype.forEach;

exports = module.exports = function (dom) {
	forEach.call(dom.childNodes, function (child) {
		var href;
		if (!isElement(child)) return;
		if (!isAnchor(child)) return exports(child);
		href = child.getAttribute('href');
		if (!href) return;
		if (!isExternalLink(href) && !isFileLink(child.pathname || href)) return;
		child.setAttribute('target', '_blank');
	});
};
