'use strict';

var validDocument      = require('dom-ext/html-document/valid-html-document')
  , htmlToDom          = require('dom-ext/html-document/#/html-to-dom')
  , tokensToDom        = require('html-template-to-dom/from-resolved-tokens')
  , resolveInlineBlock = require('./lib/resolve-inline-block')
  , mdToHtml           = require('./lib/md-to-html')
  , normalizeLinks     = require('./lib/normalize-links')

  , isArray = Array.isArray;

module.exports = function (document) {
	validDocument(document);
	return function (message/*, options*/) {
		var dom, options = Object(arguments[1]);
		if (isArray(message)) {
			return tokensToDom(document, message, {
				normalizeHtml: mdToHtml,
				normalizeDomAfterInserts: function (dom) {
					if (options.inline) dom = resolveInlineBlock(dom, document);
					if (dom && dom.childNodes) normalizeLinks(dom);
					return dom;
				}
			});
		}
		dom = htmlToDom.call(document, mdToHtml(message));
		if (options.inline) dom = resolveInlineBlock(dom, document);
		normalizeLinks(dom);
		return dom;
	};
};
