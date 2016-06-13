'use strict';

var remove             = require('dom-ext/node/#/remove')
  , isDocumentFragment = require('dom-ext/document-fragment/is-document-fragment')

  , isArray = Array.isArray;

module.exports = function self(data) {
	if (data == null) return data;
	if (isDocumentFragment(data.parentNode)) remove.call(data);
	else if (isArray(data)) data.forEach(self);
	// Access value to validate eventual observable
	// (so it's not picked by unconsumed detector)
	data.value; //jslint: ignore
	return data;
};
