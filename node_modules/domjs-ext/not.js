'use strict';

var not      = require('observable-value/not')
  , validate = require('./lib/validate-injection');

module.exports = function (domjs/*, name*/) {
	var options = arguments[1];
	domjs.ns[(options && options.name) || 'not'] = function () {
		return validate(not.apply(this, arguments));
	};
};
