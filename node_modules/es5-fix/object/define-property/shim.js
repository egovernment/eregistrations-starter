'use strict';

var assign     = require('es5-ext/object/assign')
  , isObject   = require('es5-ext/object/is-object')
  , startsWith = require('es5-ext/string/#/starts-with')

  , getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor
  , defineProperty = Object.defineProperty
  , hasOwnProperty = Object.prototype.hasOwnProperty;

module.exports = function (obj, name, desc) {
	var old;
	if (
		// Error - fallback to native
		!isObject(obj) || !isObject(desc) ||
			// If it's defined for first time - will work
			!hasOwnProperty.call(obj, name) ||
			// Will be writable - will work
			desc.writable ||
			// Is writable - will work
			((old = getOwnPropertyDescriptor(obj, name)) && (old.writable ||
				// Error - fallback to native
				!old.configurable))
	) {
		try {
			return defineProperty(obj, name, desc);
		} catch (e) {
			if (!startsWith.call(e.message,
					"defineProperty is not supported on ") || !('value' in desc)) {
				throw e;
			}
			// Fallback to direct assign
			obj[name] = desc.value;
			return obj;
		}
	}
	delete obj[name];
	if (!old) return defineProperty(obj, name, desc);
	if (('get' in desc) || ('set' in desc)) {
		delete old.value;
	} else {
		delete old.get;
		delete old.set;
	}
	return defineProperty(obj, name, assign(old, desc));
};
