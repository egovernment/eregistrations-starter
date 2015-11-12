'use strict';

var eqSloppy = require('observable-value/eq-sloppy')
  , validate = require('./lib/validate-injection');

module.exports = function (domjs/*, options*/) {
	var options = arguments[1];
	domjs.ns[(options && options.name) || 'eqSloppy'] = function () {
		return validate(eqSloppy.apply(this, arguments));
	};
};
