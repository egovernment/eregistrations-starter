'use strict';

if (!require('./is-implemented')()) {
	Object.defineProperty(Date, 'parse', { value: require('./shim'),
		configurable: true, enumerable: false, writable: true });
}
