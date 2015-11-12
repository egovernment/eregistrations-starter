'use strict';

var eqSome   = require('observable-value/eq-some')
  , validate = require('./lib/validate-injection');

module.exports = function (domjs/*, options*/) {
	var options = arguments[1];
	domjs.ns[(options && options.name) || 'eqSome'] = function () {
		return validate(eqSome.apply(this, arguments));
	};
};
