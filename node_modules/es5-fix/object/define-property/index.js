'use strict';

module.exports = require('./is-implemented')()
	? Object.defineProperty
	: require('./shim');
