'use strict';

var ltOrEq   = require('observable-value/lt-or-eq')
  , validate = require('./lib/validate-injection');

module.exports = function (domjs/*, options*/) {
	var options = arguments[1];
	domjs.ns[(options && options.name) || 'ltOrEq'] = function () {
		return validate(ltOrEq.apply(this, arguments));
	};
};
