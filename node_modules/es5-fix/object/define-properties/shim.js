'use strict';

var forEach        = require('es5-ext/object/for-each')
  , isObject       = require('es5-ext/object/is-object')
  , defineProperty = require('../define-property/shim')

  , define = function (v, k) { defineProperty(this, k, v); }
  , defineProperties = Object.defineProperties;

module.exports = function (obj, props) {
	if (!isObject(obj) || !isObject(props)) return defineProperties(obj, props);
	forEach(props, define, obj);
	return obj;
};
