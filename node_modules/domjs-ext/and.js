'use strict';

var and      = require('observable-value/and')
  , unbind   = require('./lib/unbind-injected')
  , validate = require('./lib/validate-injection')

  , forEach = Array.prototype.forEach;

module.exports = function (domjs/*, options*/) {
	var options = arguments[1];
	domjs.ns[(options && options.name) || 'and'] = function () {
		forEach.call(arguments, unbind);
		return validate(and.apply(this, arguments));
	};
};
