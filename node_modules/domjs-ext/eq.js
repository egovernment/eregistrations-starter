'use strict';

var eq       = require('observable-value/eq')
  , validate = require('./lib/validate-injection');

module.exports = function (domjs/*, options*/) {
	var options = arguments[1];
	domjs.ns[(options && options.name) || 'eq'] = function () {
		return validate(eq.apply(this, arguments));
	};
};
