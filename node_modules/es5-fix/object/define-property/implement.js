'use strict';

if (!require('./is-implemented')()) {
	Object.defineProperty(Object, 'defineProperty', { value: require('./shim'),
		configurable: true, enumerable: false, writable: true });
}
