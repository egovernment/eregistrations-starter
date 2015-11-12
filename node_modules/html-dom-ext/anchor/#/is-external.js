'use strict';

var value      = require('es5-ext/object/valid-value')
  , anchor     = require('dom-ext/html-anchor-element/valid-html-anchor-element')
  , resolve    = require('url3/resolve')
  , isExternal = require('../../lib/is-external');

module.exports = function (relUrl) {
	return isExternal(value(relUrl), resolve(relUrl, anchor(this).href), this);
};
