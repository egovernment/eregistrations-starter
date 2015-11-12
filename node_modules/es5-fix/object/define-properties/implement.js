'use strict';

if (!require('./is-implemented')()) {
	Object.defineProperty(Object, 'defineProperties', { value: require('./shim'),
		configurable: true, enumerable: false, writable: true });
}
