'use strict';

module.exports = require('./is-implemented')()
	? Date.parse
	: require('./shim');
