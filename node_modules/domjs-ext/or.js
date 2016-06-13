'use strict';

var or       = require('observable-value/or')
  , unbind   = require('./lib/unbind-injected')
  , validate = require('./lib/validate-injection')

  , forEach = Array.prototype.forEach;

module.exports = function (domjs/*, name*/) {
	var options = arguments[1];
	domjs.ns[(options && options.name) || 'or'] = function () {
		forEach.call(arguments, unbind);
		return validate(or.apply(this, arguments));
	};
};
