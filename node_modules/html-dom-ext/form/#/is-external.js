'use strict';

var value      = require('es5-ext/object/valid-value')
  , form       = require('dom-ext/html-form-element/valid-html-form-element')
  , resolve    = require('url3/resolve')
  , isExternal = require('../../lib/is-external');

module.exports = function (relUrl) {
	return isExternal(value(relUrl), resolve(relUrl, form(this).action), this);
};
