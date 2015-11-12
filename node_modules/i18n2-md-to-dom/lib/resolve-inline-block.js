'use strict';

var find               = require('es5-ext/array/#/find')
  , isElement          = require('dom-ext/element/is-element')
  , isDocumentFragment = require('dom-ext/document-fragment/is-document-fragment')
  , isInlineElement    = require('dom-ext/html-element/is-inline-element')
  , isNotInlineElement = function (el) { return isElement(el) && !isInlineElement(el); };

exports = module.exports = function (dom, document) {
	var blockEl = find.call(dom.childNodes, isNotInlineElement), df;
	if (blockEl) return exports(blockEl, document);
	switch (dom.childNodes.length) {
	case 0:
		return null;
	case 1:
		return dom.childNodes[0];
	}
	if (isDocumentFragment(dom)) return dom;
	df = document.createDocumentFragment();
	while (dom.firstChild) df.appendChild(dom.firstChild);
	return df;
};
