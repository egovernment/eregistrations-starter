'use strict';

module.exports = require('./is-implemented')()
	? Object.defineProperties
	: require('./shim');
