'use strict';

var remove             = require('dom-ext/node/#/remove')
  , isDocumentFragment = require('dom-ext/document-fragment/is-document-fragment')
  , _if                = require('observable-value/if')
  , validate           = require('./lib/validate-injection')

  , isArray = Array.isArray, unbind;

unbind = function (data) {
	if (data == null) return data;
	if (isDocumentFragment(data.parentNode)) remove.call(data);
	else if (isArray(data)) data.forEach(unbind);
	// Access value to validate eventual observable
	// (so it's not picked by unconsumed detector)
	data.value; //jslint: ignore
	return data;
};

module.exports = function (domjs/*, options*/) {
	var options = arguments[1];
	domjs.ns[(options && options.name) || '_if'] = function (cond, t, f) {
		return validate(_if(cond, unbind(t), unbind(f)));
	};
};
