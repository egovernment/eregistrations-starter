'use strict';

var or       = require('observable-value/or')
  , validate = require('./lib/validate-injection');

module.exports = function (domjs/*, name*/) {
	var options = arguments[1];
	domjs.ns[(options && options.name) || 'or'] = function () {
		return validate(or.apply(this, arguments));
	};
};
