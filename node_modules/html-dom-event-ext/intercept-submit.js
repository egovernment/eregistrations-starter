'use strict';

var callable           = require('es5-ext/object/valid-callable')
  , object             = require('es5-ext/object/valid-object')
  , htmlDocument       = require('dom-ext/html-document/valid-html-document')
  , detectRegularClick = require('./detect-regular-click')
  , isExternal         = require('html-dom-ext/form/#/is-external');

module.exports = function (document, location, callback/*, options*/) {
	var isRegularClick, options = Object(arguments[3]), method;

	(htmlDocument(document) && object(location) && callable(callback));
	isRegularClick = detectRegularClick(document);
	method = (options.method == null) ? null : String(options.method).toLowerCase();
	document.addEventListener('submit', function (event) {
		var form = event.target;
		if (!isRegularClick()) return;
		if (method && (form.method !== method)) return;
		if (isExternal.call(form, location.href)) return;
		event.preventDefault();
		callback(form);
	}, false);
};
